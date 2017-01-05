const UrlPattern = require('url-pattern')
const { parse } = require('url')

module.exports = (pattern = '*', methods = '*') => {
  const urlPattern = new UrlPattern(pattern)
  const alloweMethods = methods === '*'
    ? null
    : Array.isArray(methods) ? methods : methods.split(',')

  return (req) => {
    if (alloweMethods && !alloweMethods.includes(req.method)) {
      return null
    }
    return urlPattern.match(parse(req.url).pathname)
  }
}
