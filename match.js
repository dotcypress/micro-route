const route = require('./')

module.exports = (req, pattern, methods, parseQuery) => route(pattern, methods, parseQuery)(req)
