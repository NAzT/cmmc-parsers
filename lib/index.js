'use strict';
const formatters = require('./formatter');
const Parser = require('binary-parser').Parser;

const headerParser = Parser.start()
  .endianess('big')
  .array('header', {
    type: 'uint8',
    length: 2,
    formatter: formatters.toBuffer
  })
  .uint8('version')
  .uint8('project')
  .array('reserved', {
    type: 'uint8',
    length: 4,
    formatter: formatters.toBuffer
  })
  .endianess('little')
  .uint32('temperature_c')
  .uint32('humidity_percent_rh')
  .uint32('sound_avg_db')
  .uint32('max_acc')
  .uint32('acc_x')
  .uint32('acc_y')
  .uint32('acc_z')
  .uint32('gyro_x')
  .uint32('gyro_y')
  .uint32('gyro_z')
  .uint32('mag_x')
  .uint32('mag_y')
  .uint32('mag_z')
  .uint32('nb_rssi')
  .uint32('nb_csq')
  .uint32('nb_ber')
  .int32('gps_latitude')
  .int32('gps_longitude')
  .int32('gps_altitude_cm')
  .int32('gps_us')
  .nest('cmmc_packet',
    {
      type: Parser.start()
        .array('header', {
          type: 'uint8',
          length: 2,
          formatter: formatters.toBuffer
        })
        .uint8('version')
        .uint8('project')
        .array('reserved', {
          type: 'uint8',
          length: 4,
          formatter: formatters.toBuffer
        })
        .endianess('little')
        .uint32('sleepTime')
        .uint32('ms')
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
              formatter: ((arr) => {
                const input = arr.filter(charCode => charCode > 0);
                return input.map(charCode => String.fromCharCode(charCode)).join('');
              })
            })
            .uint32('node_ms')
            .uint32('node_sent_ms')
            .uint32('node_sum')
        })
    });

//
//   .endianess('big')
//   .array('from', {
//     type: 'uint8',
//     length: 6,
//     formatter: toHexString
//   })
//   .array('to', {
//     type: 'uint8',
//     length: 6,
//     formatter: toHexString
//   })
//   .endianess('little')
//   .uint8('type')
//   .uint32('battery')
//   .uint32('field1')
//   .uint32('field2')
//   .uint32('field3')
//   .uint32('field4')
//   .uint32('field5')
//   .uint32('field6')
//   .uint8('name_len')
//   .array('device_name', {
//     type: 'uint8',
//     length: 15,
//     formatter: ((arr) => {
//       const input = arr.filter(charCode => charCode > 0);
//       return input.map(charCode => String.fromCharCode(charCode)).join('');
//     })
//   })
//   .uint32('node_ms')
//   .uint32('node_sent_ms')
//   .uint32('node_sum')
//   .uint32('controller_sleep_time')
//   .uint32('controller_ms')
//   .uint32('controller_sum');
//
// const versions = {
//   version_1: CMMCParser
// };
module.exports = {
  header: headerParser
};

