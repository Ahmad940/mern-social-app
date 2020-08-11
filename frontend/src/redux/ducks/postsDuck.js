import Axios from 'axios';
import jsCookie from 'js-cookie';

// types
export const POST_FETCH_REQUEST = 'mern_social_app/users/POST_FETCH_REQUEST';
export const POST_FETCH_SUCCESS = 'mern_social_app/users/POST_FETCH_SUCCESS';
export const POST_FETCH_FAIL = 'mern_social_app/users/POST_FETCH_FAIL';
export const POST_NEW_REQUEST = 'mern_social_app/users/POST_NEW_REQUEST';
export const POST_NEW_SUCCESS = 'mern_social_app/users/POST_NEW_SUCCESS';
export const POST_NEW_ERROR = 'mern_social_app/users/POST_NEW_ERROR';
export const LIKE_POST = 'mern_social_app/users/LIKE_POST';
export const LIKE_POST_ERROR = 'mern_social_app/users/LIKE_POST_ERROR';
export const COMMENT_NEW_SUCCESS = 'mern_social_app/users/COMMENT_NEW_SUCCESS';
export const COMMENT_NEW_FAIL = 'mern_social_app/users/COMMENT_NEW_FAIL';
export const COMMENT_NEW_REQUEST = 'mern_social_app/users/COMMENT_NEW_REQUEST';

// reducers
const initialState = {
  loading: false,
  error: [],
  likeError: [],
  postError: [],
  commentError: [],
  newPostLoading: false,
  posts: [],
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_FETCH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case POST_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.payload,
      };
    case POST_FETCH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case LIKE_POST:
      return {
        ...state,
        posts: action.payload,
        likeError: [],
      };

    case LIKE_POST_ERROR:
      return {
        ...state,
        likeError: action.payload,
      };
    case POST_NEW_REQUEST:
      return {
        ...state,
        newPostLoading: true,
      };
    case POST_NEW_SUCCESS:
      let posts = [{ ...action.payload }, ...state.posts];
      return {
        ...state,
        newPostLoading: false,
        posts,
      };
    case POST_NEW_ERROR: {
      return {
        ...state,
        postError: action.payload,
      };
    }
    case COMMENT_NEW_SUCCESS: {
      let post = state.posts.find((p) => p._id === action.payload._id);
      let index = state.posts.indexOf(post);
      state.posts[index] = action.payload;
      return {
        ...state,
        commentError: [],
      };
    }
    case COMMENT_NEW_FAIL: {
      return {
        ...state,
        commentError: action.payload,
      };
    }
    default:
      return state;
  }
};

// actions
export const postFetchRequestAction = () => {
  return { type: POST_FETCH_REQUEST };
};

export const postFetchSuccessAction = (payload) => {
  return { type: POST_FETCH_SUCCESS, payload };
};

export const postFetchFailAction = (payload) => {
  return { type: POST_FETCH_FAIL, payload };
};

// thunks
export const postFetchThunk = () => (dispatch) => {
  dispatch(postFetchRequestAction());
  setInterval(() => {
    Axios.get('/api/post/posts')
      .then(({ data }) => {
        dispatch(postFetchSuccessAction(data));
      })
      .catch(({ response }) => {
        dispatch(postFetchFailAction(response));
      });
  }, 1000);
};

export const LikePostActionThunk = (postId) => (dispatch) => {
  const token = jsCookie.get('token');
  Axios.post(
    '/api/post/like',
    { postId },
    {
      headers: {
        'x-auth-token': `${token}`,
      },
    }
  )
    .then((res) => {
      dispatch({ type: LIKE_POST, payload: res.data });
    })
    .catch(({ response }) =>
      dispatch({ type: LIKE_POST_ERROR, payload: response })
    );
};

export const newPostActionThunk = (text) => (dispatch) => {
  dispatch({ type: POST_NEW_REQUEST });
  const token = jsCookie.get('token');
  Axios.post(
    '/api/post/new',
    { text },
    {
      headers: {
        'x-auth-token': `${token}`,
      },
    }
  )
    .then((res) => {
      dispatch({ type: POST_NEW_SUCCESS, payload: res.data });
    })
    .catch(({ response }) =>
      dispatch({ type: POST_NEW_ERROR, payload: response })
    );
};

export const newCommentActionThunk = (postId, comment) => (dispatch) => {
  // dispatch({ type: COMMENT_NEW_REQUEST, });
  const token = jsCookie.get('token');
  Axios.post(
    '/api/comment/new',
    { postId, comment },
    {
      headers: {
        'x-auth-token': `${token}`,
      },
    }
  )
    .then((res) => {
      dispatch({ type: COMMENT_NEW_SUCCESS, payload: res.data });
    })
    .catch(({ response }) =>
      dispatch({ type: COMMENT_NEW_FAIL, payload: response })
    );
};

export default postReducer;
