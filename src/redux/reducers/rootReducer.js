import { combineReducers } from 'redux';
import userReducer from './userReducer'
import blogReducer from './blogReducer'
import otherReducer from './otherReducer'

const rootReducer = combineReducers({
  blog : blogReducer,
  other : otherReducer,
  user : userReducer
})
export default rootReducer;