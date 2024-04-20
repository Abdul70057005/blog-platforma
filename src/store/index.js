import { configureStore, combineReducers, applyMiddleware } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'

import { listArticles } from './listArticlesReducet'
import { articleCreateReducer } from './articleCreateReducer'

const rootReduser = combineReducers({
  listArticles,
  articleCreateReducer,
})

export const store = configureStore({ reducer: rootReduser }, applyMiddleware(thunk))
