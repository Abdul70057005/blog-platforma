import React, { useEffect } from 'react'
import './article.css'
import { useParams, Link, useNavigate } from 'react-router-dom/dist'
import { useDispatch, useSelector } from 'react-redux'
import { format } from 'date-fns'
import Markdown from 'react-markdown'
import { Spin, Button, message, Popconfirm } from 'antd'

import {
  articleLoad,
  articleDelete,
  articleUpdateClear,
  articleFavorite,
  articleDeleteFavorite,
} from '../../store/action'

const Article = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const e = useSelector((state) => state.listArticles.article)
  const spinner = useSelector((state) => state.listArticles.spinner)
  const userCur = useSelector((state) => state.listArticles.userCurrent)
  const deleteArticle = useSelector((state) => state.articleCreateReducer.articleDelete)
  const deleteArticleError = useSelector((state) => state.articleCreateReducer.articleDeleteError)
  const favoriteArticle = useSelector((state) => state.articleCreateReducer.articleFavorite)
  const deleteFavoriteArticle = useSelector((state) => state.articleCreateReducer.articleDeleteFavorite)

  console.log(e)
  console.log(userCur)
  function getCookie() {
    return document.cookie.split('; ').reduce((acc, item) => {
      const [name, value] = item.split('=')
      acc[name] = value
      return acc
    }, {})
  }
  const cookie = getCookie()

  const { article } = useParams()

  useEffect(() => {
    dispatch(articleLoad(article, cookie.token))
  }, [article])

  useEffect(() => {
    if (deleteArticle !== null && deleteArticleError === null) {
      const goHome = () => navigate('/', { replace: true })
      goHome()
      dispatch(articleUpdateClear())
    }
  }, [deleteArticle, deleteArticleError, navigate])

  useEffect(() => {
    dispatch(articleLoad(article, cookie.token))
  }, [favoriteArticle, deleteFavoriteArticle])

  if (e) {
    if (spinner) {
      return (
        <div className="loading">
          <Spin />
        </div>
      )
    }

    // delete

    const confirm = (a) => {
      console.log(a)
      message.success('delete')
      console.log(cookie.token)
      dispatch(articleDelete(e.slug, cookie.token))
    }
    const cancel = (a) => {
      console.log(a)
      message.error('no delete')
    }

    // like
    const handleFavoriteArticle = (slug) => {
      dispatch(articleFavorite(slug, cookie.token))
    }

    const handleDeleteFavoriteArticle = (slug) => {
      dispatch(articleDeleteFavorite(slug, cookie.token))
    }

    //tag
    let articleTag = e.tagList.map((tag, index) => {
      if (tag.length > 0) {
        return (
          <div key={index} className="li__item__tag">
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
      <ul className="article--ul">
        <li className="article--li" key={e.slug}>
          <div className="article--li__item">
            <div className="article--li__item__main">
              <div className="article--li__item__title">
                <div className="article--li__item__title__text">
                  {e.title.length < 50 ? e.title : e.title.slice(0, 51) + '...'}
                </div>
                {!e.favorited ? (
                  <button
                    type="submit"
                    className="article--li__item__title__like"
                    onClick={() => handleFavoriteArticle(e.slug)}
                  >
                    ♡ {e.favoritesCount}
                  </button>
                ) : (
                  <button
                    className="article--li__item__title__like"
                    onClick={() => handleDeleteFavoriteArticle(e.slug)}
                  >
                    <span className="like">♥</span> {e.favoritesCount}
                  </button>
                )}
              </div>
              <div className="article--li__item__tag-list">
                {e.tagList.length > 0 ? articleTag : <div className="li__item__tag">нет тегов</div>}
              </div>
              <div className="article--li__item__text">
                {e?.description.length > 120 ? e.description.slice(0, 121) : e.description}
              </div>
              <div>
                <Markdown>{e.body}</Markdown>
              </div>
            </div>
          </div>
          <div className="article--li__item__profile">
            <div className="article--li__item__profile__wrapper">
              <div>
                <div className="article--li__item__profile__name">{e.author.username}</div>
                <div className="article--li__item__profile__data">{createdData}</div>
              </div>
              <img src={e.author.image} alt="p" width={'46px'} height={'46px'} />
            </div>
            {userCur?.username === e?.author?.username ? (
              <div className="article--li__item__profile__buttons">
                <Popconfirm
                  title="Delete the task"
                  description="Are you sure to delete this task?"
                  onConfirm={confirm}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                  placement={'right'}
                >
                  <Button danger>Delete</Button>
                </Popconfirm>
                <Link
                  to={`/articles/${e.slug}/edit`}
                  type="submit"
                  className="article--li__item__profile__button--edit"
                >
                  Edit
                </Link>
              </div>
            ) : (
              <></>
            )}
          </div>
        </li>
      </ul>
    )
  }
}

export default Article
