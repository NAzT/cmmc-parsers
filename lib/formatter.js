module.exports = {
  toBuffer: arr => Buffer.from(arr),
  toHextString: arr => Buffer.from(arr).toString('hex')
}
