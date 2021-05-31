exports.command = '*'
exports.desc = 'get domains from mailcow and compare them against inwx'

exports.builder = {
  'c': {
    alias: 'createRecord',
    desc: 'create record if not exist'
  },
  'u': {
    alias: 'updateRecord',
    desc: 'update record if not exist'
  },
  'a': {
    alias: 'doAll',
    desc: 'create/update dns entry/record'
  },
  'v': {
    alias: 'verbose',
    desc: 'more details'
  },
  'd': {
    alias: 'domain',
    requiresArg: true,
    desc: 'check only one domain',
    type: 'string'
  }
}

const config = require('../lib/config')()
const computeRecords = require('../lib/computeRecords')()
require('console.table')
const chalk = require('chalk')
const dns = require('../lib/dns')()

const { MailcowApiClient } = require('../lib/mailcow-api/index')
const { ApiClient, Language } = require('domrobot-client')

exports.handler = async (options) => {
  config.init()
  dns.init(options)

  const inwxTarget = (process.env.INWX_ENVIRONMENT === 'Production') ? ApiClient.API_URL_LIVE : ApiClient.API_URL_OTE
  const apiClient = new ApiClient(inwxTarget, Language.EN, false)
  const loginResponse = await apiClient.login(process.env.INWX_USERNAME, process.env.INWX_PASSWORD, '')
  if (loginResponse.code !== 1000) {
    console.error(chalk.red(`Api login error. Code: ${loginResponse.code}  Message: ${loginResponse.msg}`))
    process.exit()
  }

  const mcc = new MailcowApiClient(process.env.MAILCOW_API_BASEURL, process.env.MAILCOW_API_KEY)
  computeRecords.mailcowClient = mcc

  let domains = await mcc.getDomain(options.domain || 'all')
  for (const domain of domains) {
    console.info(chalk.magenta('checking ' + domain.domain_name))
    console.group()
    if (await dns.checkDomain(domain.domain_name, apiClient)) {
      let desiredRecords = await computeRecords.getDesiredRecords(domain.domain_name)
      const dnsRecords = await apiClient.callApi('nameserver.info', { domain: domain.domain_name })

      const records = await dns.processRecords(desiredRecords, dnsRecords, apiClient)
      console.table(records)
    }
    console.groupEnd()
  }
}