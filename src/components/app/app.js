import React from "react";
import ListArticles from "../listArticles";
import './app.css'
import { BrowserRouter } from "react-router-dom/dist";
import { Routes, Route, Link } from "react-router-dom/dist";
import Article from "../article";



const App = () => {
    
   
    return (
        <BrowserRouter>
            <div className="blog">
                <header className="blog__header">
                    <Link to="/" className="blog__header__item">Realworld Blog</Link>
                    <div className="blog__header__item">
                        <div className="blog__header__item__elem">Sign In</div>
                        <div className="blog__header__item__elem">Sign Up</div>
                    </div>
                </header>
               
            <Routes>
                <Route path="/" element={<ListArticles />}/>
                <Route path="/articles" element={<ListArticles />}/>
                <Route path="/articles/:article" element={<Article />}/>
            </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App