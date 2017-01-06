const microRoute = require('./')

function dispatch (actions, pattern, methods, handler) {
  if (handler) {
    actions.push({
      handler,
      route: microRoute(pattern, methods, true)
    })
  }
  const serverCallback = (req, res) => {
    for (const { route, handler } of actions) {
      const match = route(req)
      if (match) {
        return handler(req, res, match)
      }
    }
  }
  serverCallback.dispatch = (...args) => dispatch(actions, ...args)
  return serverCallback
}

module.exports = (pattern, methods, handler) => dispatch([], pattern, methods, handler)
