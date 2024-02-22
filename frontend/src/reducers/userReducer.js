import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PROFILE_RESET,
  UPDATE_PASSWORD_RESET,
NEW_POST_REQUEST,
  NEW_POST_SUCCESS,
NEW_POST_FAIL,
NEW_POST_RESET,
ALL_POST_FAIL,
ALL_POST_REQUEST,
ALL_POST_SUCCESS,
NEW_COMMENT_REQUEST,
NEW_COMMENT_SUCCESS,
NEW_COMMENT_FAIL,
POST_DETAILS_REQUEST,
POST_DETAILS_FAIL,
POST_DETAILS_SUCCESS,
LOAD_USER_FAIL,
LOAD_USER_REQUEST,
LOAD_USER_SUCCESS,
ALL_USER_FAIL,
ALL_USER_REQUEST,
ALL_USER_SUCCESS,


  CLEAR_ERRORS,
} from "../constants/userConstants";

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    
    case REGISTER_USER_REQUEST:
      case LOAD_USER_REQUEST:
      case LOGIN_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
   
    case REGISTER_USER_SUCCESS:
      case LOAD_USER_SUCCESS:
      case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

      case LOGOUT_SUCCESS:
        return {
          loading: false,
          user: null,
          isAuthenticated: false,
        };
      
      case LOGIN_FAIL:
    case REGISTER_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
      case LOAD_USER_FAIL:
        return{
          loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
        }
      case LOGOUT_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};


export const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };

    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
      };

    case FORGOT_PASSWORD_FAIL:
    case RESET_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};


export const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
    case UPDATE_PASSWORD_REQUEST:
    
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PROFILE_SUCCESS:
    case UPDATE_PASSWORD_SUCCESS:
   
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

   

    case UPDATE_PROFILE_FAIL:
    case UPDATE_PASSWORD_FAIL:
   
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_PROFILE_RESET:
    case UPDATE_PASSWORD_RESET:
   
      return {
        ...state,
        isUpdated: false,
      };

   
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const postReducer = (state = { }, action) => {
  switch (action.type) {
    
    case NEW_POST_REQUEST:
      return {
        ...state,
        loading: true,
      };
   
    case NEW_POST_SUCCESS:
    
      return {
        loading: false,
        success: action.payload.success,
        post: action.payload.post,
      };
    case NEW_POST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case NEW_POST_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const postsReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case ALL_POST_REQUEST:
    
      return {
        loading: true,
        posts: [],
      };
    case ALL_POST_SUCCESS:
      return {
        loading: false,
        posts: action.payload.posts,
      };

    case ALL_POST_FAIL:
    
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const postDetailsReducer = (state = { post: {} }, action) => {
  switch (action.type) {
    case POST_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case POST_DETAILS_SUCCESS:
      return {
        loading: false,
        post: action.payload.post,
      };
    case POST_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const usersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case ALL_USER_REQUEST:
    
      return {
        loading: true,
        users: [],
      };
    case ALL_USER_SUCCESS:
      return {
        loading: false,
        users: action.payload.user,
      };

    case ALL_USER_FAIL:
    
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};