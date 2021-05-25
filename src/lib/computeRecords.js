module.exports = () => {
  let mailcowClient = {}

  return {
    async getDesiredRecords(domainName) {
      const records = []
      for (key in process.setup.dns_records) {
        if (process.setup.dns_records[key]) {
          const [recordName, recordType] = key.split('_')
          let record = await this.computeRecord(recordName, recordType, domainName)

          if (record !== undefined) {
            records.push(record)
          }
        }
      }
      return records
    },
    computeTxtRecord (recordName, domainName) {
      return this.mailcowClient.getDKIM(domainName)
        .then(dkim => {
          const record = {
            type: 'TXT',
            ttl: process.setup.data.ttl,
            prio: 0
          }
          let content = 0
          if (process.setup.content[recordName]) {
            content = process.setup.content[recordName]
          } else {
            switch (recordName) {
              case 'dkim':
                content = dkim.dkim_txt
                break
            }
          }
          record.name = '_' + recordName + '._tcp'
          record.content = content
          return record
        })
    },

    computeSrvRecord (recordName, domainName) {
      const record = {
        type: 'SRV',
        ttl: process.setup.data.ttl,
        prio: process.setup.data.prio
      }

      let port = 0
      if (process.setup.ports[recordName]) {
        port = process.setup.ports[recordName]
      } else {
        console.info('Port for ' + recordName + ' is missing')
      }
      record.name = '_' + recordName + '._tcp'
      record.content = process.setup.data.prio + ' ' + port + ' ' + process.setup.domains.mailserver.url
      return record
    },

    computeRecord (recordName, recordType, domainName) {
      switch (recordType) {
        case 'txt':
          return this.computeTxtRecord(recordName, domainName)
        case 'srv':
          return this.computeSrvRecord(recordName, domainName)
      }
    }
  }
}