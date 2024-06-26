import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom/dist'
import { useSelector, useDispatch } from 'react-redux'

import ListArticles from '../listArticles'
import './app.css'
import Article from '../article'
import SignIn from '../signIn/signIn'
import SignUp from '../signUp/signUp'
import Profile from '../profile/profile'
import NewArticle from '../newArticle/newArticle'
import ArticleEdit from '../articleEdit/articleEdit'
import RequireAuth from '../requireAuth'
import { userCurrent, logOut, articlesLoad } from '../../store/action'

import photo from './Rectangle 1.png'

const App = () => {
  const dispatch = useDispatch()
  const userCur = useSelector((state) => state.listArticles.userCurrent)
  const updateUser = useSelector((state) => state.listArticles.userUpdate)
  console.log(userCur)

  /*function getCookie() {
    return document.cookie.split('; ').reduce((acc, item) => {
      const [name, value] = item.split('=')
      acc[name] = value
      return acc
    }, {})
  }
  const cookie = getCookie()
  console.log(cookie.token)*/

  useEffect(() => {
    /*if (cookie.token) {
      dispatch(userCurrent(cookie.token))
    }*/
    if (localStorage.getItem('token')) {
      dispatch(userCurrent(localStorage.getItem('token')))
    }
  }, [])

  useEffect(() => {
    /*if (cookie.token) {
      dispatch(userCurrent(cookie.token))
    }*/
    if (localStorage.getItem('token')) {
      dispatch(userCurrent(localStorage.getItem('token')))
    }
  }, [updateUser])

  const handleLogOut = () => {
    dispatch(logOut())
    document.cookie = `token=;expires=${new Date(0)}`
    localStorage.clear()
    dispatch(articlesLoad())
    //console.log(cookie)
    console.log(document.cookie)
    //dispatch(articlesLoad())
  }

  return (
    <BrowserRouter basename="/blog-platforma">
      <div className="blog">
        {!userCur ? (
          <header className="blog__header">
            <div className="blog__header__item">Realworld Blog</div>
            <div className="blog__header__item">
              <Link to="/sign-in" className="blog__header__item__elem">
                Sign In
              </Link>
              <Link to="/sign-up" className="blog__header__item__elem">
                Sign Up
              </Link>
            </div>
          </header>
        ) : (
          <header className="blog__header">
            <div className="blog__header__item--login">Realworld Blog</div>
            <div className="blog__header__item">
              <Link to="/new-article" className="blog__header__item__elem--create">
                create Article
              </Link>
              <div className="blog__header__item__elem--user">
                <div>{userCur?.username}</div>
                <Link to="/profile">
                  {!userCur?.image ? (
                    <img src={photo} alt="a" width={'46px'} height={'46px'} />
                  ) : (
                    <img src={userCur?.image} alt="a" width={'46px'} height={'46px'} />
                  )}
                </Link>
              </div>
              <button className=" logout" onClick={handleLogOut}>
                Log Out
              </button>
            </div>
          </header>
        )}

        <Routes>
          <Route path="/" element={<ListArticles />} />
          <Route path="/articles" element={<ListArticles />} />
          <Route path="/articles/:article" element={<Article />} />
          <Route path="/articles/:article/edit" element={<ArticleEdit />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route
            path="/new-article"
            element={
              <RequireAuth>
                <NewArticle />
              </RequireAuth>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
