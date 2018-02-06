# dead-simple-redux-factories
A series of factory functions to cleanly implement the reducer and middleware patterns for Redux.

### Table of Contents
* Introduction
* Requirements
* Recommended modules
* Installation
* Usage
* Maintainers
* Development
* Contributing
* License
* Code of Conduct

## Introduction
Redux is a popular state-management solution for extracting state from React applications that emphasizes a uni-directional data flow and functional programming. A Redux reducer is a function that handles changes in state and should be a pure function. A Redux middleware is a function that handles unpredictable tasks and is not necessarily a pure function. Both reducers and middleware are called in response to the dispatch of an action by the Redux store and generally handle more than a single action. A common pattern to handle multiple actions in a single reducer or middleware function is the JS switch statement.

```
const reducer = (state = { counter: 0 }, action) => {
  switch(action.type)
  
    case INCREMENT_BY:
      return Object.assign({}, state, {
        counter: state.counter + action.payload
      }
      
    default:
      return state
      
}
```

Althought the above pattern serves rudimentary cases, as an application grows, a single reducer or middleware can handle several actions. It is important to note in these situations that switch statements do not create a new scope per case or even within the entire statement. This can lead to unexpected behaviour due to collisions between each case. This library attempts to provide simple factories to avoid this issue without extensive boilerplate code. By assigning each action an independent handler function, the developer can safely assume that the scope of the handler will not be polluted by other handlers within the same reducer or middleware. 

The switch statement pattern also provides a solution for default behaviour such as the initial state and handling of unhandled actions. However, an extensive initial state can be onerous on the function definition as a default parameter and the default handler can further collide with other handlers within the same reducer or middleware function. This library provides sensitive defaults for this behaviour. In the case of the initial state, an empty object is provided. The reducer's default handler returns the current state and the middleware's default handler returns the result of the next function with the current action as an argument. However, the developer can further alter this behaviour by providing overrides as the second argument. See usage for more details.

## Requirements
- [Node 8.9.0+](https://nodejs.org/en/)

## Recommended Modules
This package was developed using [Yarn](https://yarnpkg.com/en/), an alternative to npm.
The following are necessary to run the test suite.

- [Jest](https://github.com/facebook/jest)

## Installation

```
yarn add dead-simple-redux-factories
```

or

```
npm install --save dead-simple-redux-factories
```

## Usage
Both factories follow a similar interface. An object containing the action handlers is to be provided as the first argument.

In relation to the `reducerFactory`, a second argument can be provided as an object containing the following keys:
- `initialState`: The initial state for the reducer
- `defaultHandler`: An action handler for unmatched actions

All functions provided to the reducer should satisfy the following signature:
```
function actionHandler (state, action) { [return newState] }
```

In relation to the `middlewareFactory`, a function can be provided as the second argument to serve as the default handler for unhandled actions. All functions provided to the middleware should satisfy the following signature:
```
function actionHandler (store, next, action) { [return next(action)] }
```

```
import { reducerFactory, middlewareFactory } from 'dead-simple-redux-factories'


# Create some actions to be handled
const INCREMENT_BY = "NAMESPACED_INCREMENT_BY"
const DECREMENT_BY = "NAMESPACED_DECREMENT_BY"


# Create the reducer by providing an object containing the action handlers
# and an optional object containing the initialState and/or the defaultHandler
const counterReducer = reducerFactory({
  
  # Provide the action handlers as functions attached to the action's type.
  [INCREMENT_BY]: (state, action) => {
    return Object.assign({}, state, {
      counter: state.counter + action.payload
    })
  },

  [DECREMENT_BY]: (state, action) => {
    return Object.assign({}, state, {
      counter: state.counter - action.payload
    })
  }
  
}, {
    
  # Provide an object for the initial state. 
  # Defaults to an empty object.
  initialState: {
    counter: 0
  },

  # Provide a function to handle actions without a matching handler function.
  # Defaults to returning the current state
  defaultHandler: (state, action) => {
    return Object.assign({}, state, {
      counter: state.counter + 1
    }
  }
  
})

# Create the middleware by providing an object containing the action handlers
# and an optional function to serve as the default handler.
const middleware = middlewareFactory({

  # Provide the action handlers as functions attached to the action's type.
  [INCREMENT_BY]: (store, next, action) => {
    console.log("Incrementing by ", action.payload)
    return next(action)
  },

  [DECREMENT_BY]: (store, next, action) => {
    console.log("Decrementing by ", action.payload)
    return next(action)
  }

# Provide a function to handle actions without a matching handler
# Defaults to returning the result of the next function with the current action
}, (store, next, action) => {
  console.log("Unhandled action!")
  console.log(action)
  return next(action)
})
```

## Maintainers
Solely maintained by Esteban Hernández. Open to contributions. Use freely at your own risk.

## Development

After checking out the repo, run `yarn install` to install dependencies. Then, run `yarn test` to run the tests.

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/LySofDev/dead-simple-redux-factories. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

The package is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

## Code of Conduct

Everyone interacting in the node-duplicate-directory project’s codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](https://github.com/[USERNAME]/redux_gen/blob/master/CODE_OF_CONDUCT.md).d P
