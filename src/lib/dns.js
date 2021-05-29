module.exports = () => {
  return {
    async processRecords (desiredRecords, dnsRecords, inwx, dryRun = true) {
      const records = []
      for (const desiredRecord of desiredRecords) {
        let found = false
        for (const dnsRecord of dnsRecords.resData.record) {
          if (dnsRecord.name === desiredRecord.name) {
            found = dnsRecord
          }
        }
        if (found) {
          let record = {}
          record.equal = '✓'
          record['inwx_id'] = found.id
          for (const key in desiredRecord) {
            record['mc_' + key] = desiredRecord[key]
            record['inwx_' + key] = found[key]
            if (desiredRecord[key] !== found[key]) {
              record.equal = '❌'
            }
          }
          records.push(record)
        } else {
          console.warn('record ' + desiredRecord.name + ' not found')
          if (!dryRun) {
            desiredRecord.roId = dnsRecords.resData.roId
            const domainCheckResponse = await inwx.callApi('nameserver.createRecord', desiredRecord)
            if (domainCheckResponse.code !== 1000) {
              console.error('can not create record: ' + desiredRecord.name + ' for: ' + domainName)
            }
          }
        }
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