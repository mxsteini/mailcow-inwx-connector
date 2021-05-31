exports.command = '*'
exports.desc = 'get status from mailcow and inwx'

exports.builder = {
  'n': {
    alias: 'createRecord',
    desc: 'create record if not exist'
  },
  'w': {
    alias: 'updateRecord',
    desc: 'update record if not exist'
  },
  'e': {
    alias: 'createEntry',
    desc: 'create dns entry if not exist'
  },
  'g': {
    alias: 'updateEntry',
    desc: 'update dns entry if not exist'
  },
  'u': {
    alias: 'updateAll',
    desc: 'update dns entries and records'
  },
  'c': {
    alias: 'createAll',
    desc: 'update dns entry if not exist'
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
const dns = require('../lib/dns')()
const cTable = require('console.table')
const chalk = require('chalk')

const { MailcowApiClient } = require('../lib/mailcow-api/index')
const { ApiClient, Language } = require('domrobot-client')
// require('better-logging')(console)

exports.handler = async (options) => {
  config.init()
  // console.log('status: 16', process.setup.dns_records)

  // process.exit();

  const apiClient = new ApiClient(ApiClient.API_URL_OTE, Language.EN, false)
  const loginResponse = await apiClient.login(process.env.INWX_USERNAME, process.env.INWX_PASSWORD, '')
  if (loginResponse.code !== 1000) {
    console.error(`Api login error. Code: ${loginResponse.code}  Message: ${loginResponse.msg}`)
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

      const records = await dns.processRecords(desiredRecords, dnsRecords, apiClient, options)
      console.table(records)
    }
    console.groupEnd()
  }
}