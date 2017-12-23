const Parser = require('binary-parser').Parser
const _sensorNodeParser = require('./_cmmcSensorNode')
const headerParser = require('./_header')
const tailParser = require('./_tail')

const myParser = Parser.start()
  .nest('header', {type: headerParser})
  .endianess('little')
  .uint32('sleep_time')
  .uint32('controller_ms')
  .nest('sensor_node', {type: _sensorNodeParser})
  .nest('tail', {type: tailParser})

module.exports = myParser
