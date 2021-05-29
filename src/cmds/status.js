exports.command = 'status'
exports.desc = 'get status from mailcow and inwx'
exports.builder = {
  dir: {
    default: '.'
  }
}

const config = require('../lib/config')()
const computeRecords = require('../lib/computeRecords')()
const dns = require('../lib/dns')()

const { MailcowApiClient } = require('mailcow-api')
const { ApiClient, Language } = require('domrobot-client')
require('better-logging')(console)

exports.handler = async () => {
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

  let domains = await mcc.getDomain('all')
  domains.forEach(async (domain) => {
    if (!await dns.checkDomain(domain.domain_name, apiClient)) {
      console.warn(domain.domain_name + ' has no dns entry')
    } else {
      let desiredRecords = await computeRecords.getDesiredRecords(domain.domain_name)
      console.info(domain.domain_name)

      const dnsRecords = await apiClient.callApi('nameserver.info', { domain: domain.domain_name })

      // console.log(desiredRecords)
      const records = dns.processRecords(desiredRecords, dnsRecords, apiClient)
      console.table(records)
    }
  })

}