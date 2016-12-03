const UrlPattern = require('url-pattern')
const { parse } = require('url')

class MicroRoute {
  constructor (methods, pattern = '*') {
    if (methods && methods !== '*') {
      this.methods = Array.isArray(methods)
        ? methods
        : methods.split(',')
    }
    this.pattern = new UrlPattern(pattern)
  }

  match (req) {
    if (this.methods && !this.methods.includes(req.method)) {
      return null
    }
    return this.pattern.match(parse(req.url).pathname)
  }
}

module.exports = MicroRoute
