const Parser = require('binary-parser').Parser
const _sensorNodeParser = require('./_cmmcSensorNode')
const formatters = require('../formatter')

const myParser = Parser.start()
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
  .endianess('little')
  .uint32('sleep_time')
  .uint32('controller_ms')
  .nest('sensor_node', {
    type: _sensorNodeParser
  })
  .uint32('controller_sum')
  .array('controller_tail', {
    type: 'uint8',
    length: 2,
    formatter: formatters.toHextString
  })

module.exports = myParser
