const { reducerFactory } = require("../")

test("it returns a function", () => {
  expect(typeof reducerFactory()).toBe("function")
})

test("A counter reducer", () => {

  const reducer = reducerFactory({

    "INCREMENT_BY_ONE": (state, action) => {
      return Object.assign({}, state, {
        counter: state.counter + 1
      })
    },

    "INCREMENT_BY": (state, action) => {
      return Object.assign({}, state, {
        counter: state.counter + action.payload
      })
    }

  })

  const initialState = { counter: 0 }

  let currentState = reducer(initialState, { type: "INCREMENT_BY_ONE" })

  expect(currentState).toEqual({ counter: 1 })

  currentState = reducer(currentState, { type: "INCREMENT_BY", payload: 5 })

  expect(currentState).toEqual({ counter: 6 })

})

test("A reducer that counts each action except handled", () => {

  const reducer = reducerFactory({

    "RESET_COUNTER": (state, action) => {
      return Object.assign({}, state, {
        actionsTaken: 0
      })
    }

  }, {

    initialState: {
      actionsTaken: 0
    },

    defaultHandler: (state, action) => {
      return Object.assign({}, state, {
        actionsTaken: state.actionsTaken + 1
      })
    }

  })

  let currentState = reducer(undefined, { type: "ACTION_A" })

  expect(typeof currentState).toBe("object")

  expect(currentState.actionsTaken).toEqual(1)

  expect(currentState).toEqual({ actionsTaken: 1 })

  currentState = reducer(currentState, { type: "ACTION_B" })

  expect(currentState).toEqual({ actionsTaken: 2 })

  currentState = reducer(currentState, { type: "RESET_COUNTER" })

  expect(currentState).toEqual({ actionsTaken: 0 })

})
