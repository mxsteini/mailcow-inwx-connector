const env = require('dotenv').config()
const path = require('path')
const loadJsonFile = require('load-json-file')

module.exports = () => {
  // let foo = 'bar'
  return {
    init () {
      process.setup = loadJsonFile.sync(path.join('./config.json'))
      return env
    }
  }
}
