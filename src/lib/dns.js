module.exports = () => {
  return {
    processRecords(desiredRecords, dnsRecords, inwx, dryRun = true) {
      const records = []
      desiredRecords.forEach((desiredRecord) => {
        let found = false
        dnsRecords.resData.record.forEach((dnsRecord) => {
          if (dnsRecord.name === desiredRecord.name) {
            found = dnsRecord
          }
        })
        if (found) {
          let equal = true

          let record = {}
          record.equal = "✓"
          record['inwx_id'] = found.id
          for (const key in desiredRecord) {
            record['mc_' + key] = desiredRecord[key]
            record['inwx_' + key] = found[key]
            if (desiredRecord[key] !== found[key])
            {
              record.equal = "❌"
            }
          }
          records.push(record)
        } else {
          console.warn('record ' + desiredRecord.name + ' not found' )
        }
      })
      return records
    },
    async checkDomain(domainName, inwx, dryRun = true) {
      const domainCheckResponse = await inwx.callApi('nameserver.info', { domain: domainName })
      if (domainCheckResponse.code !== 1000) {
        console.warn(domainName + ' has no dns entry')
        return false
      }
      return true
    }
  }
}