const Parser = require('binary-parser').Parser
const formatters = require('../formatter')

const headerParser = Parser.start()
  .endianess('big')
  .array('header', {
    type: 'uint8',
    length: 2,
    formatter: formatters.toHextString
  })
  .uint8('version')
  .uint8('project')
  .array('reserved', {
    type: 'uint8',
    length: 4,
    formatter: formatters.toHextString
  })

module.exports = headerParser
