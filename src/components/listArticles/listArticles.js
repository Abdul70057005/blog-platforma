import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './listArticles.css'
import { format } from 'date-fns'
import { Pagination, Spin } from 'antd'
import { Link } from 'react-router-dom/dist'

import { articlesLoad, articleFavorite, articleDeleteFavorite } from '../../store/action'

const ListArticles = () => {
  const dispatch = useDispatch()
  const articles = useSelector((state) => state.listArticles.articles)
  const spinner = useSelector((state) => state.listArticles.spinner)
  const favoriteArticle = useSelector((state) => state.articleCreateReducer.articleFavorite)
  const favoriteArticleError = useSelector((state) => state.articleCreateReducer.articleFavoriteError)
  const deleteFavoriteArticle = useSelector((state) => state.articleCreateReducer.articleDeleteFavorite)
  const deleteFavoriteArticleError = useSelector((state) => state.articleCreateReducer.articleDeleteFavoriteError)

  console.log(favoriteArticle)
  console.log(favoriteArticleError)
  console.log(deleteFavoriteArticle)
  console.log(deleteFavoriteArticleError)
  console.log(articles)

  useEffect(() => {
    if (cookie.token && cookie.page) {
      console.log('za')
      dispatch(articlesLoad(cookie.token, cookie.page))
    } else {
      console.log('va')
      dispatch(articlesLoad())
    }
  }, [])

  function getCookie() {
    return document.cookie.split('; ').reduce((acc, item) => {
      const [name, value] = item.split('=')
      acc[name] = value
      return acc
    }, {})
  }
  const cookie = getCookie()
  console.log(cookie)

  useEffect(() => {
    dispatch(articlesLoad(cookie.token))
  }, [favoriteArticle, deleteFavoriteArticle])

  const handleFavoriteArticle = (slug) => {
    dispatch(articleFavorite(slug, cookie.token))
  }

  const handleDeleteFavoriteArticle = (slug) => {
    dispatch(articleDeleteFavorite(slug, cookie.token))
  }

  const handlePagination = (page) => {
    document.cookie = `page=${page}; path=/`
    dispatch(articlesLoad(cookie.token, page))
  }

  let listArticles = articles.map((e) => {
    //tag
    let articleTag = e.tagList.map((tag, i) => {
      if (tag.length > 0) {
        return (
          <div key={i} className="li__item__tag">
            {tag}
          </div>
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
              <Link to={`/articles/${e.slug}`} className="li__item__title__text">
                {e.title.length < 50 ? e.title : e.title.slice(0, 51) + '...'}
              </Link>
              {!e.favorited ? (
                <button type="submit" className="li__item__title__like" onClick={() => handleFavoriteArticle(e.slug)}>
                  ♡ {e.favoritesCount}
                </button>
              ) : (
                <button className="li__item__title__like" onClick={() => handleDeleteFavoriteArticle(e.slug)}>
                  <span className="like">♥</span> {e.favoritesCount}
                </button>
              )}
            </div>
            <div className="li__item__profile">
              <div>
                <div className="li__item__profile__name">{e.author.username}</div>
                <div className="li__item__profile__data">{createdData}</div>
              </div>
              <img src={e.author.image} alt="photo" width={'46px'} height={'46px'} />
            </div>
          </div>
          <div className="li__item__tag-list">
            {e.tagList.length > 0 ? articleTag : <div className="li__item__tag">нет тегов</div>}
          </div>
          <div className="li__item__text">
            {e?.description.length > 120 ? e.description.slice(0, 121) : e.description}
          </div>
        </div>
      </li>
    )
  })

  return (
    <div>
      <ul className="ul">{!spinner ? listArticles : <Spin />}</ul>
      <div className="pagination">
        <Pagination total={50} defaultCurrent={cookie.page} onChange={(page) => handlePagination(page)} />
      </div>
    </div>
  )
}

export default ListArticles
