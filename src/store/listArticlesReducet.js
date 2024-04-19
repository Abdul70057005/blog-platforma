import {
  ARTICLES_LOAD,
  ARTICLE_LOAD,
  SPIN_OFF,
  SPIN_ON,
  USER_REGISTRATION,
  USER_REGISTRATION_ERROR,
  USER_CURRENT,
  LOG_OUT,
  USER_LOGIN,
  USER_LOGIN_ERROR,
  USER_UPDATE,
  USER_UPDATE_ERROR,
  USER_CLEAR,
} from './action'

const initialState = {
  articles: [],
  article: null,
  spinner: false,
  user: null,
  userError: null,
  userLogin: null,
  userLoginError: null,
  userCurrent: null,
  userUpdate: null,
  userUpdateError: null,
}

export const listArticles = (state = initialState, action) => {
  switch (action.type) {
    case ARTICLES_LOAD: {
      return {
        ...state,
        articles: action.payload.articles,
        article: state.article,
        spinner: state.spinner,
        user: state.user,
        userError: state.userError,
        userLogin: state.userLogin,
        userLoginError: state.userLoginError,
        userCurrent: state.userCurrent,
        userUpdate: state.userUpdate,
        userUpdateError: state.userUpdateError,
      }
    }
    case ARTICLE_LOAD: {
      return {
        ...state,
        articles: state.articles,
        article: action.payload.article,
        spinner: state.spinner,
        user: state.user,
        userError: state.userError,
        userLogin: state.userLogin,
        userLoginError: state.userLoginError,
        userCurrent: state.userCurrent,
        userUpdate: state.userUpdate,
        userUpdateError: state.userUpdateError,
      }
    }
    case SPIN_OFF: {
      return {
        ...state,
        articles: state.articles,
        article: state.article,
        spinner: false,
        user: state.user,
        userError: state.userError,
        userLogin: state.userLogin,
        userLoginError: state.userLoginError,
        userCurrent: state.userCurrent,
        userUpdate: state.userUpdate,
        userUpdateError: state.userUpdateError,
      }
    }
    case SPIN_ON: {
      return {
        ...state,
        articles: state.articles,
        article: state.article,
        spinner: true,
        user: state.user,
        userError: state.userError,
        userLogin: state.userLogin,
        userLoginError: state.userLoginError,
        userCurrent: state.userCurrent,
        userUpdate: state.userUpdate,
        userUpdateError: state.userUpdateError,
      }
    }
    case USER_REGISTRATION: {
      return {
        ...state,
        articles: state.articles,
        article: state.article,
        spinner: state.spinner,
        user: action.payload.user,
        userError: state.userError,
        userLogin: state.userLogin,
        userLoginError: state.userLoginError,
        userCurrent: state.userCurrent,
        userUpdate: state.userUpdate,
        userUpdateError: state.userUpdateError,
      }
    }
    case USER_REGISTRATION_ERROR: {
      return {
        ...state,
        articles: state.articles,
        article: state.article,
        spinner: state.spinner,
        user: state.user,
        userError: action.payload,
        userLogin: state.userLogin,
        userLoginError: state.userLoginError,
        userCurrent: state.userCurrent,
        userUpdate: state.userUpdate,
        userUpdateError: state.userUpdateError,
      }
    }
    case USER_LOGIN: {
      return {
        ...state,
        articles: state.articles,
        article: state.article,
        spinner: state.spinner,
        user: state.user,
        userError: state.userError,
        userLogin: action.payload.user,
        userLoginError: state.userLoginError,
        userCurrent: state.userCurrent,
        userUpdate: state.userUpdate,
        userUpdateError: state.userUpdateError,
      }
    }
    case USER_LOGIN_ERROR: {
      return {
        ...state,
        articles: state.articles,
        article: state.article,
        spinner: state.spinner,
        user: state.user,
        userError: state.userError,
        userLogin: state.userLogin,
        userLoginError: action.payload,
        userCurrent: state.userCurrent,
        userUpdate: state.userUpdate,
        userUpdateError: state.userUpdateError,
      }
    }
    case USER_CURRENT: {
      return {
        ...state,
        articles: state.articles,
        article: state.article,
        spinner: state.spinner,
        user: state.user,
        userError: state.userError,
        userLogin: state.userLogin,
        userLoginError: state.userLoginError,
        userCurrent: action.payload.user,
        userUpdate: state.userUpdate,
        userUpdateError: state.userUpdateError,
      }
    }
    case USER_UPDATE: {
      return {
        ...state,
        articles: state.articles,
        article: state.article,
        spinner: state.spinner,
        user: state.user,
        userError: state.userError,
        userLogin: state.userLogin,
        userLoginError: state.userLoginError,
        userCurrent: state.userCurrent,
        userUpdate: action.payload.user,
        userUpdateError: state.userUpdateError,
      }
    }
    case USER_UPDATE_ERROR: {
      return {
        ...state,
        articles: state.articles,
        article: state.article,
        spinner: state.spinner,
        user: state.user,
        userError: state.userError,
        userLogin: state.userLogin,
        userLoginError: state.userLoginError,
        userCurrent: state.userCurrent,
        userUpdate: state.userUpdate,
        userUpdateError: action.payload,
      }
    }
    case LOG_OUT: {
      return {
        ...state,
        articles: state.articles,
        article: state.article,
        spinner: state.spinner,
        user: null,
        userError: null,
        userLogin: null,
        userLoginError: null,
        userCurrent: null,
        userUpdate: null,
        userUpdateError: null,
      }
    }
    case USER_CLEAR: {
      return {
        ...state,
        articles: state.articles,
        article: state.article,
        spinner: state.spinner,
        user: null,
        userError: null,
        userLogin: null,
        userLoginError: null,
        userCurrent: state.userCurrent,
        userUpdate: null,
        userUpdateError: null,
      }
    }

    default:
      return state
  }
}
