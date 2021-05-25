exports.command = 'status'
exports.desc = 'get status from mailcow and inwx'
exports.builder = {
  dir: {
    default: '.'
  }
}

const config = require('../lib/config')()
const computeRecords = require('../lib/computeRecords')()

const { MailcowApiClient } = require('mailcow-api')
const { ApiClient, Language } = require('domrobot-client')


exports.handler = async () => {
  config.init()
  // console.log('status: 16', process.setup.dns_records)

  // process.exit();

  const apiClient = new ApiClient(ApiClient.API_URL_OTE, Language.EN, false)
  const loginResponse = await apiClient.login(process.env.INWX_USERNAME, process.env.INWX_PASSWORD, '')
  if (loginResponse.code !== 1000) {
    throw new Error(`Api login error. Code: ${loginResponse.code}  Message: ${loginResponse.msg}`)
  }

  const mcc = new MailcowApiClient(process.env.MAILCOW_API_BASEURL, process.env.MAILCOW_API_KEY)
  computeRecords.mailcowClient = mcc

  let domains = await mcc.getDomain('all')
  domains.forEach(async (domain) => {
    const domainCheckResponse = await apiClient.callApi('nameserver.info', { domain: domain.domain_name })
    const records = []
    if (domainCheckResponse.code !== 1000) {
      console.log(domain.domain_name + ' has no dns entry')
    } else {
      let desiredRecords = await computeRecords.getDesiredRecords(domain.domain_name)
      console.log('status: 53', desiredRecords)
      resolve()
    }
  })

}