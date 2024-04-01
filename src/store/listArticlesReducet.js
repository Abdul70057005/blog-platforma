import { ARTICLES_LOAD, ARTICLE_LOAD, SPIN_OFF, SPIN_ON } from "./action";

const initialState = {
    articles: [],
    article: null,
    spinner: false,
}

export const listArticles = (state = initialState, action) => {
    switch (action.type) {
        case ARTICLES_LOAD: {
            return {
                ...state,
                articles: action.payload.articles,
                article: state.article,
                spinner: state.spinner
            }
        }
        case ARTICLE_LOAD: {
            return {
                ...state,
                articles: state.articles,
                article: action.payload.article,
                spinner: state.spinner
            }
        }
        case SPIN_OFF: {
            return {
                ...state,
                articles: state.articles,
                article: state.article,
                spinner: false
            }
        }
        case SPIN_ON: {
            return {
                ...state,
                articles: state.articles,
                article: state.article,
                spinner: true
            }
        }
        default:
            return state
    }
}