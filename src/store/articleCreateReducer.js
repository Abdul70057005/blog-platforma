import {
  ARTICLE_CREATE,
  ARTICLE_CREATE_ERROR,
  ARTICLE_UPDATE,
  ARTICLE_UPDATE_ERROR,
  ARTICLE_UPDATE_CLEAR,
  ARTICLE_DELETE,
  ARTICLE_DELETE_ERROR,
  ARTICLE_FAVORITE,
  ARTICLE_FAVORITE_ERROR,
  ARTICLE_DELETE_FAVORITE,
  ARTICLE_DELETE_FAVORITE_ERROR,
} from './action'

const initialState = {
  articleCreate: null,
  articleCreateError: null,
  articleUpdate: null,
  articleUpdateError: null,
  articleDelete: null,
  articleDeleteError: null,
  articleFavorite: null,
  articleFavoriteError: null,
  articleDeleteFavorite: null,
  articleDeleteFavoriteError: null,
}

export const articleCreateReducer = (state = initialState, action) => {
  switch (action.type) {
    case ARTICLE_CREATE: {
      return {
        ...state,
        articleCreate: action.payload.article,
        articleCreateError: state.articleCreateError,
        articleUpdate: state.articleUpdate,
        articleUpdateError: state.articleUpdateError,
        articleDelete: state.articleDelete,
        articleDeleteError: state.articleDeleteError,
        articleFavorite: state.articleFavorite,
        articleFavoriteError: state.articleFavoriteError,
        articleDeleteFavorite: state.articleDeleteFavorite,
        articleDeleteFavoriteError: state.articleDeleteFavoriteError,
      }
    }
    case ARTICLE_CREATE_ERROR: {
      return {
        ...state,
        articleCreate: state.articleCreate,
        articleCreateError: action.payload,
        articleUpdate: state.articleUpdate,
        articleUpdateError: state.articleUpdateError,
        articleDelete: state.articleDelete,
        articleDeleteError: state.articleDeleteError,
        articleFavorite: state.articleFavorite,
        articleFavoriteError: state.articleFavoriteError,
        articleDeleteFavorite: state.articleDeleteFavorite,
        articleDeleteFavoriteError: state.articleDeleteFavoriteError,
      }
    }
    case ARTICLE_UPDATE: {
      return {
        ...state,
        articleCreate: state.articleCreate,
        articleCreateError: state.articleCreateError,
        articleUpdate: action.payload.article,
        articleUpdateError: state.articleUpdateError,
        articleDelete: state.articleDelete,
        articleDeleteError: state.articleDeleteError,
        articleFavorite: state.articleFavorite,
        articleFavoriteError: state.articleFavoriteError,
        articleDeleteFavorite: state.articleDeleteFavorite,
        articleDeleteFavoriteError: state.articleDeleteFavoriteError,
      }
    }
    case ARTICLE_UPDATE_ERROR: {
      return {
        ...state,
        articleCreate: state.articleCreate,
        articleCreateError: state.articleCreateError,
        articleUpdate: state.articleUpdate,
        articleUpdateError: action.payload,
        articleDelete: state.articleDelete,
        articleDeleteError: state.articleDeleteError,
        articleFavorite: state.articleFavorite,
        articleFavoriteError: state.articleFavoriteError,
        articleDeleteFavorite: state.articleDeleteFavorite,
        articleDeleteFavoriteError: state.articleDeleteFavoriteError,
      }
    }
    case ARTICLE_DELETE: {
      return {
        ...state,
        articleCreate: state.articleCreate,
        articleCreateError: state.articleCreateError,
        articleUpdate: state.articleUpdate,
        articleUpdateError: state.articleUpdateError,
        articleDelete: 'delete',
        articleDeleteError: state.articleDeleteError,
        articleFavorite: state.articleFavorite,
        articleFavoriteError: state.articleFavoriteError,
        articleDeleteFavorite: state.articleDeleteFavorite,
        articleDeleteFavoriteError: state.articleDeleteFavoriteError,
      }
    }
    case ARTICLE_DELETE_ERROR: {
      return {
        ...state,
        articleCreate: state.articleCreate,
        articleCreateError: state.articleCreateError,
        articleUpdate: state.articleUpdate,
        articleUpdateError: state.articleUpdateError,
        articleDelete: state.articleDelete,
        articleDeleteError: action.payload,
        articleFavorite: state.articleFavorite,
        articleFavoriteError: state.articleFavoriteError,
        articleDeleteFavorite: state.articleDeleteFavorite,
        articleDeleteFavoriteError: state.articleDeleteFavoriteError,
      }
    }
    case ARTICLE_FAVORITE: {
      return {
        ...state,
        articleCreate: state.articleCreate,
        articleCreateError: state.articleCreateError,
        articleUpdate: state.articleUpdate,
        articleUpdateError: state.articleUpdateError,
        articleDelete: state.articleDelete,
        articleDeleteError: state.articleDeleteError,
        articleFavorite: action.payload.article,
        articleFavoriteError: state.articleFavoriteError,
        articleDeleteFavorite: state.articleDeleteFavorite,
        articleDeleteFavoriteError: state.articleDeleteFavoriteError,
      }
    }
    case ARTICLE_FAVORITE_ERROR: {
      return {
        ...state,
        articleCreate: state.articleCreate,
        articleCreateError: state.articleCreateError,
        articleUpdate: state.articleUpdate,
        articleUpdateError: state.articleUpdateError,
        articleDelete: state.articleDelete,
        articleDeleteError: state.articleDeleteError,
        articleFavorite: state.articleFavorite,
        articleFavoriteError: action.payload,
        articleDeleteFavorite: state.articleDeleteFavorite,
        articleDeleteFavoriteError: state.articleDeleteFavoriteError,
      }
    }
    case ARTICLE_DELETE_FAVORITE: {
      return {
        ...state,
        articleCreate: state.articleCreate,
        articleCreateError: state.articleCreateError,
        articleUpdate: state.articleUpdate,
        articleUpdateError: state.articleUpdateError,
        articleDelete: state.articleDelete,
        articleDeleteError: state.articleDeleteError,
        articleFavorite: state.articleFavorite,
        articleFavoriteError: state.articleFavoriteError,
        articleDeleteFavorite: action.payload.article,
        articleDeleteFavoriteError: state.articleDeleteFavoriteError,
      }
    }
    case ARTICLE_DELETE_FAVORITE_ERROR: {
      return {
        ...state,
        articleCreate: state.articleCreate,
        articleCreateError: state.articleCreateError,
        articleUpdate: state.articleUpdate,
        articleUpdateError: state.articleUpdateError,
        articleDelete: state.articleDelete,
        articleDeleteError: state.articleDeleteError,
        articleFavorite: state.articleFavorite,
        articleFavoriteError: state.articleFavoriteError,
        articleDeleteFavorite: state.articleDeleteFavorite,
        articleDeleteFavoriteError: action.payload,
      }
    }
    case ARTICLE_UPDATE_CLEAR: {
      return {
        ...state,
        articleCreate: null,
        articleCreateError: null,
        articleUpdate: null,
        articleUpdateError: null,
        articleDelete: null,
        articleDeleteError: null,
        articleFavorite: state.articleFavorite,
        articleFavoriteError: state.articleFavoriteError,
        articleDeleteFavorite: state.articleDeleteFavorite,
        articleDeleteFavoriteError: state.articleDeleteFavoriteError,
      }
    }
    default:
      return state
  }
}
