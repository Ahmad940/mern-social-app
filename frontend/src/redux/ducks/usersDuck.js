import Axios from 'axios';
import Cookie from 'js-cookie';
import { useHistory } from 'react-router-dom';

// types
export const USER_SIGNIN_REQUEST = 'mern_social_app/users/USER_SIGNIN_REQUEST';
export const USER_SIGNIN_SUCCESS = 'mern_social_app/users/USER_SIGNIN_SUCCESS';
export const USER_SIGNIN_FAIL = 'mern_social_app/users/USER_SIGNIN_FAIL';

export const USER_UPDATE_REQUEST = 'mern_social_app/users/USER_UPDATE_REQUEST';
export const USER_UPDATE_SUCCESS = 'mern_social_app/users/USER_UPDATE_SUCCESS';
export const USER_UPDATE_FAIL = 'mern_social_app/users/USER_UPDATE_FAIL';

export const USER_REGISTER_REQUEST =
  'mern_social_app/users/USER_REGISTER_REQUEST';
export const USER_REGISTER_SUCCESS =
  'mern_social_app/users/USER_REGISTER_SUCCESS';
export const USER_REGISTER_FAIL = 'mern_social_app/users/USER_REGISTER_FAIL';

export const GET_USER_DATA_REQUEST =
  'mern_social_app/users/GET_USER_DATA_REQUEST';

export const GET_USER_DATA_SUCCESS =
  'mern_social_app/users/GET_USER_DATA_SUCCESS';

export const GET_USER_DATA_FAIL = 'mern_social_app/users/GET_USER_DATA_FAIL';

export const USER_LOGOUT = 'mern_social_app/users/USER_LOGOUT';

// reducers
const initialState = {
  loading: false,
  error: [],
  token: null,
  isLogged: false,
  userId: '',
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_SIGNIN_SUCCESS:
      return {
        ...state,
        token: action.payload,
        isLogged: true,
        error: [],
        loading: false,
      };
    case USER_SIGNIN_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case USER_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        token: action.payload,
        isLogged: true,
        error: [],
        loading: false,
      };
    case USER_REGISTER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case GET_USER_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_USER_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case GET_USER_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case USER_LOGOUT:
      Cookie.remove('token');
      Cookie.remove('userInfo');
      return {
        ...state,
        token: '',
        isLogged: false,
      };
    default:
      return state;
  }
};

// actions
export const userSignInAction = (data) => {
  return { type: USER_SIGNIN_SUCCESS, payload: data };
};
export const userFailAction = (data) => {
  return { type: USER_SIGNIN_FAIL, payload: data };
};

export const userRegisterSuccessAction = (data) => {
  return {
    type: USER_REGISTER_SUCCESS,
    payload: data,
  };
};

export const userRegisterFailAction = (data) => {
  return {
    type: USER_REGISTER_FAIL,
    payload: data,
  };
};

export const userLogoutAction = () => {
  return { type: USER_LOGOUT };
};

export const getUserDataSuccessAction = () => {
  return { type: GET_USER_DATA_SUCCESS };
};

export const getUserDataFailAction = (data) => {
  return { type: GET_USER_DATA_SUCCESS, payload: data };
};

// thunks
export const signinActionThunk = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  await Axios.post('/api/auth/login', { email, password })
    .then(({ data }) => {
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
      Cookie.set('token', data, { expires: 365 });
      const history = useHistory();

      history.push('/');
    })
    .catch(({ response }) => {
      dispatch(userFailAction(response));
    });
};

export const registerActionThunk = (data) => (dispatch) => {
  const { firstName, lastName, email, password } = data;
  Axios.post('/api/auth/register', {
    firstName,
    lastName,
    email,
    password,
  })
    .then(({ data }) => {
      dispatch(userRegisterSuccessAction(data));
      Cookie.set('token', data);
      const history = useHistory();

      dispatch(getUserActionThunk());

      history.push('/');
    })
    .catch(({ response }) => {
      dispatch(userRegisterFailAction(response));
    });
};

export const getUserActionThunk = () => (dispatch) => {
  const token = Cookie.get('token');
  Axios.get('/api/users/me', {
    headers: {
      'x-auth-token': `${token}`,
    },
  })
    .then(({ data }) => {
      let userInfo = {
        _id: data._id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        join: data.createdAt,
        lastUpdated: data.updatedAt,
      };
      Cookie.set('userInfo', userInfo);
    })
    .catch(({ response }) => {
      console.log(response);
    });
};

export default usersReducer;
