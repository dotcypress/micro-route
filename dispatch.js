const microRoute = require('./')

const dispatch = (actions, pattern, methods, handler, patternOpts) => {
  if (handler) {
    actions.push({
      handler,
      route: microRoute(pattern, methods, true, patternOpts)
    })
  }
  const serverCallback = (req, res) => {
    for (const { route, handler } of actions) {
      const match = route(req)
      if (match) {
        const payload = match.pattern !== '*'
          ? { params: match.params, query: match.query }
          : undefined
        return handler(req, res, payload)
      }
    }
  }
  serverCallback.dispatch = (...args) => dispatch(actions, ...args)
  serverCallback.otherwise = (cb) => dispatch(actions, '*', '*', cb)
  return serverCallback
}

module.exports = (pattern, methods, handler, patternOpts) => dispatch([], pattern, methods, handler, patternOpts)
