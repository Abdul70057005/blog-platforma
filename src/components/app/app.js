import React, { useEffect } from 'react'
import ListArticles from '../listArticles'
import './app.css'
import { BrowserRouter } from 'react-router-dom/dist'
import { Routes, Route, Link } from 'react-router-dom/dist'
import Article from '../article'
import SignIn from '../signIn/signIn'
import SignUp from '../signUp/signUp'
import Profile from '../profile/profile'
import NewArticle from '../newArticle/newArticle'
import ArticleEdit from '../articleEdit/articleEdit'
import RequireAuth from '../requireAuth'
import { useSelector, useDispatch } from 'react-redux'
import { userCurrent, logOut } from '../../store/action'

const App = () => {
  const dispatch = useDispatch()
  const userCur = useSelector((state) => state.listArticles.userCurrent)
  const updateUser = useSelector((state) => state.listArticles.userUpdate)
  console.log(userCur)

  function getCookie() {
    return document.cookie.split('; ').reduce((acc, item) => {
      const [name, value] = item.split('=')
      acc[name] = value
      return acc
    }, {})
  }
  const cookie = getCookie()
  console.log(cookie.token)

  useEffect(() => {
    if (cookie.token) {
      dispatch(userCurrent(cookie.token))
    }
  }, [])

  useEffect(() => {
    if (cookie.token) {
      dispatch(userCurrent(cookie.token))
    }
  }, [updateUser])

  const handleLogOut = () => {
    dispatch(logOut())
    document.cookie = `token=;expires=${new Date(0)}`
  }

  return (
    <BrowserRouter>
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
              <Link to="/new-article" className="blog__header__item__elem">
                create Article
              </Link>
              <div className="blog__header__item__elem user">
                <div>{userCur?.username}</div>
                <Link to="/profile">
                  <img src={userCur?.image} alt="a" width={'46px'} height={'46px'} />
                </Link>
              </div>
              <button className="blog__header__item__elem logout" onClick={handleLogOut}>
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