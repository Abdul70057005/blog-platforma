import { configureStore, combineReducers, applyMiddleware } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { listArticles } from "./listArticlesReducet";

const rootReduser = combineReducers({
    listArticles,
})

export const store = configureStore({reducer: rootReduser}, applyMiddleware(thunk))