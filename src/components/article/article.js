import React, { useEffect } from "react";
import './article.css'
import { articleLoad } from "../../store/action";
import { useParams } from "react-router-dom/dist";
import { useDispatch, useSelector } from "react-redux";
import { format } from 'date-fns'
import Markdown from "react-markdown";
import { Spin } from 'antd'

const Article = () => {
    const dispatch = useDispatch()
    const e = useSelector((state) => state.listArticles.article)
    const spinner = useSelector((state) => state.listArticles.spinner)
    const { article } = useParams()
   
    useEffect(() => {
        dispatch(articleLoad(article))
    }, [article])
   
    
    if(e) {
        if(spinner) {
            return (
                <div className="loading"><Spin /></div>
            )
        }

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
            <ul className="ul">
                <li className="li" key={e.slug}>
                    <div className="li__item">
                        <div className="li__item__header">
                            <div className="li__item__title">
                                <div className="li__item__title__text">{e.title.length < 50 ? e.title: e.title.slice(0, 51) + '...' }</div>
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
                        <div>
                            <Markdown>{e.body}</Markdown>
                        </div>
                    </div>
                </li>
            </ul>
        
        )
    }
}

export default Article