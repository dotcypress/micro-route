const MicroRoute = require('./')

function match (req, pattern, methods) {
  return new MicroRoute(methods, pattern).match(req)
}

module.exports = match
