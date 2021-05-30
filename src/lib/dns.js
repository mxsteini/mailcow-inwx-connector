const chalk = require('chalk')

const check = chalk.green('✓')
const cross = chalk.red('✗')

module.exports = () => {
  return {
    async processRecords (desiredRecords, dnsRecords, inwx, options) {
      const records = []
      for (const desiredRecord of desiredRecords) {
        let found = false
        let record = {}
        for (const dnsRecord of dnsRecords.resData.record) {
          if (dnsRecord.name === desiredRecord.name && dnsRecord.type === desiredRecord.type) {
            found = dnsRecord
          }
        }
        record.equal = cross
        record.comment = ''
        if (found) {
          record['id'] = found.id
          record['name'] = found.name
          record.equal = check
          for (const key in desiredRecord) {
            if (desiredRecord[key] !== found[key] || options.verbose) {
              record['mc_' + key] = (typeof desiredRecord[key] === 'string') ? desiredRecord[key].substring(0, 20) : desiredRecord[key]
              record['inwx_' + key] = (typeof found[key] === 'string') ? found[key].substring(0, 20) : found[key]
              if (desiredRecord[key] !== found[key]) {
                record.equal = cross
              }
            }
          }
          if (record.equal == cross && (options.updateAll || options.updateRecord || options.doAll)) {
            desiredRecord.id = found.id
            const domainCheckResponse = await inwx.callApi('nameserver.updateRecord', desiredRecord)
            if (domainCheckResponse.code !== 1000) {
              record.comment = chalk.green(domainCheckResponse.code)
            } else {
              record.comment = chalk.green('just updated')
              record.equal = check
            }

          }
        } else {
          record['name'] = desiredRecord.name
          console.warn('record ' + desiredRecord.name + ' not found')
          record.comment = chalk.red('missing')
          if (options.createAll || options.createRecord || options.doAll) {
            desiredRecord.roId = dnsRecords.resData.roId
            const domainCheckResponse = await inwx.callApi('nameserver.createRecord', desiredRecord)
            if (domainCheckResponse.code !== 1000) {
              record.comment = chalk.green(domainCheckResponse.code)
            } else {
              record.equal = check
              record.comment = chalk.green('just created')
            }
          }
        }
        records.push(record)
      }
      return records
    },
    async checkDomain (domainName, inwx, dryRun = true) {
      const domainCheckResponse = await inwx.callApi('nameserver.info', { domain: domainName })
      if (domainCheckResponse.code !== 1000) {
        console.warn(domainName + ' has no dns entry')
        return false
      }
      return true
    }
  }
}