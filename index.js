const UrlPattern = require('url-pattern')
const { parse } = require('url')

module.exports = (pattern = '*', methods = '*', parseQuery) => {
  const urlPattern = new UrlPattern(pattern)
  const alloweMethods = methods !== '*'
    ? Array.isArray(methods) ? methods : methods.split(',')
    : null
  return (req) => {
    if (alloweMethods && !alloweMethods.includes(req.method)) {
      return null
    }
    const { pathname, query } = parse(req.url, parseQuery)
    const params = urlPattern.match(pathname)
    return params && { params, query, pattern, methods }
  }
}
