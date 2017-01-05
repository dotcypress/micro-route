const route = require('./')

module.exports = (req, pattern, methods) => route(pattern, methods)(req)
