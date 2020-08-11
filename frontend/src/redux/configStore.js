import { createStore, applyMiddleware } from 'redux';
import rootReducer from './rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import { userSignInAction, getUserActionThunk } from './ducks/usersDuck';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger, thunk))
);

const token = Cookie.get('token');
if (token) {
  store.dispatch(userSignInAction(token));
  store.dispatch(getUserActionThunk());
}

export default store;
