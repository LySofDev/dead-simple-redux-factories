module.exports = function middlewareFactory(handlers, defaultHandler) {
  return store => next => action => {
    if (Object.keys(handlers).includes(action.type)) {
      return handlers[action.type](store, next, action)
    } else if (defaultHandler) {
      return defaultHandler(store, next, action)
    } else {
      return next(action)
    }
  }
}
