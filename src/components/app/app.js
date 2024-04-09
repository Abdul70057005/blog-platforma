import React, { useEffect } from "react";
import ListArticles from "../listArticles";
import './app.css'
import { BrowserRouter } from "react-router-dom/dist";
import { Routes, Route, Link } from "react-router-dom/dist";
import Article from "../article";
import SignIn from "../signIn/signIn";
import SignUp from "../signUp/signUp";
import Profile from "../profile/profile";
import { useSelector, useDispatch } from "react-redux";
import photo from "./Rectangle 1.png"
import { userCurrent, logOut } from "../../store/action";




const App = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.listArticles.user)
    const userCur = useSelector((state) => state.listArticles.userCurrent)
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
        if(cookie.token) {
            dispatch(userCurrent(cookie.token))
        }
    }, [])

    

  

    const handleLogOut = () => {
        dispatch(logOut())
        document.cookie = `token=;expires=${new Date(0)}`
        console.log(cookie.token)
    }

    
    return (
        <BrowserRouter>
            <div className="blog">
                {!userCur ? 
                <header className="blog__header">
                    <Link to="/" className="blog__header__item">Realworld Blog</Link>
                    <div className="blog__header__item">
                        <Link to="/sign-in" className="blog__header__item__elem">Sign In</Link>
                        <Link to="/sign-up" className="blog__header__item__elem">Sign Up</Link>
                    </div>
                </header>: 
                <header className="blog__header">
                <Link to="/" className="blog__header__item--login">Realworld Blog</Link>
                <div className="blog__header__item">
                    <div className="blog__header__item__elem">create Article</div>
                    <div className="blog__header__item__elem user">
                        <div>{userCur?.username}</div>
                        <Link to="/profile"><img src={photo} /></Link>
                    </div>
                    <button className="blog__header__item__elem logout" onClick={handleLogOut}>Log Out</button>
                </div>
            </header>}
                
               
            <Routes>
                <Route path="/" element={<ListArticles />}/>
                <Route path="/articles" element={<ListArticles />}/>
                <Route path="/articles/:article" element={<Article />}/>
                <Route path="/sign-in" element={<SignIn />}/>
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App


/*<header className="blog__header">
                    <Link to="/" className="blog__header__item">Realworld Blog</Link>
                    <div className="blog__header__item">
                        <Link to="/sign-in" className="blog__header__item__elem">Sign In</Link>
                        <Link to="/sign-up" className="blog__header__item__elem">Sign Up</Link>
                    </div>
                </header>*/