const Parser = require('binary-parser').Parser
const _sensorNodeParser = require('./_sensor_node')
const headerParser = require('./_header')
const tailParser = require('./_tail')

const body = Parser.start()
  .endianess('little')
  .uint32('sleep_time')
  .uint32('controller_ms')
const myParser = Parser.start()
  .nest('header', {type: headerParser})
  .nest('body', {type: body})
  .nest('sensor_node', {type: _sensorNodeParser})
  .nest('tail', {type: tailParser})

module.exports = myParser
