import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './listArticles.css'
import { articlesLoad } from "../../store/action"; 
import { format } from 'date-fns'
import { Pagination } from "antd";
import { Link } from "react-router-dom/dist";
import { Spin } from 'antd'

const ListArticles = () => {
    const dispatch = useDispatch()
    const articles = useSelector((state) => state.listArticles.articles)
    const spinner = useSelector((state) => state.listArticles.spinner)
    console.log(articles)

    useEffect(() => {
        dispatch(articlesLoad())
    }, [])
    

    let listArticles = articles.map((e, i) => {
        //tag
        let articleTag = e.tagList.map(tag => {
           if(tag.length > 0) {
                return  (
                    <div className="li__item__tag">{tag}</div>
                )
           }
           
            
        })
        articleTag = articleTag.slice(0, 4)
        
        //время
        let time = new Date(e.createdAt)
        
        let createdData = format(time, 'MMMM d, y')

        return (
            <li className="li" key={e.slug}>
                <div className="li__item">
                    <div className="li__item__header">
                        <div className="li__item__title">
                            <Link to={`/articles/${e.slug}`} className="li__item__title__text">{e.title.length < 50 ? e.title: e.title.slice(0, 51) + '...' }</Link>
                            <div className="li__item__title__like">♡ {e.favoritesCount}</div>
                        </div>
                        <div className="li__item__profile">
                            <div>
                                <div className="li__item__profile__name">{e.author.username}</div>
                                <div className="li__item__profile__data">{createdData}</div>
                            </div>
                            <img src={e.author.image} alt="photo" width={"46px"} height={"46px"} />
                        </div>
                    </div>
                    <div className="li__item__tag-list">{e.tagList.length > 0 ? articleTag: <div className="li__item__tag">нет тегов</div>}</div>
                    <div className="li__item__text">
                        {e.description.lenght < 250 ? e.description: e.description.slice(0,251)}
                    </div>
                </div>
            </li>
        )
    })

    return (
        <div>
        <ul className="ul">
            {!spinner ? listArticles: <Spin />}
        </ul>
        <div className="pagination"><Pagination defaultCurrent={1} total={50} onChange={(page) => dispatch(articlesLoad(page))} /></div>
        
        </div>
    )
}

export default ListArticles