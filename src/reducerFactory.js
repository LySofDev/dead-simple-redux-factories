module.exports = function reducerFactory(handlers, options) {
  return (state, action) => {
    const currentState = state || options.initialState || {}
    if (Object.keys(handlers).includes(action.type)) {
      return handlers[action.type](currentState, action)
    } else if (options.defaultHandler) {
      return options.defaultHandler(currentState, action)
    } else {
      return currentState
    }
  }
}
