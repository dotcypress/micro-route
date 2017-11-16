const route = require('./')

module.exports = (req, pattern, methods, parseQuery, patternOpts) => route(pattern, methods, parseQuery, patternOpts)(req)
