const NB_IOT_PARSER = require('./parsers/nb_iot').default
const CMMCParser = require('./parsers/cmmc_parser').default

module.exports = {
  NB_IOT: NB_IOT_PARSER,
  CMMC: CMMCParser
}
