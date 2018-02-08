test("it exports the reducerFactory", () => {
  const { reducerFactory } = require("../")
  expect(typeof reducerFactory).toBe("function")
})

test("it exports the middlewareFactory", () => {
  const { middlewareFactory } = require("../")
  expect(typeof middlewareFactory).toBe("function")
})
