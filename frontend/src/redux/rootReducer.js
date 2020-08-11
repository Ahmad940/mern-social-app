import { usersReducer } from './ducks/usersDuck';
import postReducer from './ducks/postsDuck';

const { combineReducers } = require('redux');

const rootReducer = combineReducers({
  users: usersReducer,
  posts: postReducer,
});

export default rootReducer;
