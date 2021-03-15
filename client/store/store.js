import {combineReducers} from 'redux'
import userReducer from './user'
import messagesReducer from './messages'

const appReducer = combineReducers({
  user: userReducer,
  messages: messagesReducer
})

export default appReducer
