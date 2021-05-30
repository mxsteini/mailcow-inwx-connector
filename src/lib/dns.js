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
          record['id'] = found.id
          record['nane'] = found.name
          for (const key in desiredRecord) {
            if (desiredRecord[key] !== found[key]) {
              // console.log('dns: 17', typeof desiredRecord[key])
              record['mc_' + key] = (typeof desiredRecord[key] === 'string') ? desiredRecord[key].substring(0, 20) : desiredRecord[key]
              record['inwx_' + key] = (typeof found[key] === 'string') ? found[key].substring(0, 20) : found[key]
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