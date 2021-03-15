import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import appReducer from './store'

const middleware = composeWithDevTools(
    applyMiddleware(thunkMiddleware)
  )

const store = createStore(
    appReducer,
    middleware
    )
export default store


