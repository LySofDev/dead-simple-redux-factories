const { middlewareFactory } = require('../')

test("it returns a function", () => {
  expect(typeof middlewareFactory()).toBe("function")
})

const create = middleware => {

  const store = {
    getState: jest.fn(() => ({})),
    dispatch: jest.fn()
  }

  const next = jest.fn()

  const invoke = action => middleware(store)(next)(action)

  return { store, next, invoke }

}

test("an auth middleware", () => {

  const middleware = middlewareFactory({

    "CHECK_STATE": (store, next, action) => {
      store.getState()
      return next(action)
    },

  })

  const action = { type: "CHECK_STATE" }

  const { store, next, invoke } = create(middleware)

  invoke(action)

  expect(store.getState).toHaveBeenCalled()

  expect(next).toHaveBeenCalledWith(action)

})

test("a logger middleware", () => {

  const middleware = middlewareFactory({

    "SCREAM": (store, next, action) => {
      store.dispatch({ type: "AAHH" })
      return next(action)
    }

  }, (store, next, action) => {
    store.getState()
    return next(action)
  })

  const action = { type: "UNHANDLED" }

  const { store, next, invoke } = create(middleware)

  invoke(action)

  expect(store.getState).toHaveBeenCalled()

  expect(next).toHaveBeenCalledWith(action)

  expect(store.dispatch).not.toHaveBeenCalled()

})
