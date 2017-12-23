const formatters = require('../formatter')
const toHexString = formatters.toHextString
const Parser = require('binary-parser').Parser
const cmmcParser = require('./_cmmcSensorNode')

const parser = Parser.start()
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
  .endianess('little')
  .uint32('temperature_c')
  .uint32('humidity_percent_rh')
  .uint32('gas_resistance_ohm')
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
  .int32('nb_rssi')
  .uint32('nb_csq')
  .uint32('nb_ber')
  .int32('gps_latitude')
  .int32('gps_longitude')
  .int32('gps_altitude_cm')
  .int32('gps_us')
  .uint32('cnt')
  .uint32('battery_raw')
  .uint8('battery_percent')
  .nest('cmmc_packet', {type: cmmcParser})
  .uint32('controller_sum')
  .array('controller_tail', {
    type: 'uint8',
    length: 2,
    formatter: formatters.toHextString
  })
  .uint32('gateway_sum')
  .array('gateway_tail', {
    type: 'uint8',
    length: 2,
    formatter: formatters.toHextString
  })

module.exports = parser
