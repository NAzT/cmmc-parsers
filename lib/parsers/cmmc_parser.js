const Parser = require('binary-parser').Parser
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
    type: Parser.start()
      .endianess('big')
      .array('from', {
        type: 'uint8',
        length: 6,
        formatter: formatters.toHextString
      })
      .array('to', {
        type: 'uint8',
        length: 6,
        formatter: formatters.toHextString
      })
      .endianess('little')
      .uint8('type')
      .uint32('battery')
      .uint32('field1')
      .uint32('field2')
      .uint32('field3')
      .uint32('field4')
      .uint32('field5')
      .uint32('field6')
      .uint8('name_len')
      .array('device_name', {
        type: 'uint8',
        length: 15,
        formatter: (arr) => {
          const input = arr.filter(charCode => charCode > 0)
          return input.map(charCode => String.fromCharCode(charCode)).join('')
        }
      })
      .uint32('node_ms')
      .uint32('node_sent_ms')
      .uint32('node_sum')
  })
  .uint32('controller_sum')
  .array('controller_tail', {
    type: 'uint8',
    length: 2,
    formatter: formatters.toHextString
  })

export default myParser
