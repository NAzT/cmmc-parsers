const NB_IOT_PARSER = require('./parsers/nb_iot')
const CMMCParser = require('./parsers/cmmc_parser')

module.exports = {
  NB_IOT: NB_IOT_PARSER,
  CMMC: CMMCParser
}
