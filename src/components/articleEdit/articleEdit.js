import React, { useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom/dist'

import { articleUpdate, articleUpdateClear } from '../../store/action'
import './articleEdit.css'

const ArticleEdit = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const e = useSelector((state) => state.listArticles.article)
  const updateArticle = useSelector((state) => state.articleCreateReducer.articleUpdate)
  const updateArticleError = useSelector((state) => state.articleCreateReducer.articleUpdateError)
  console.log(updateArticle)
  console.log(updateArticleError)
  const goHome = () => navigate('/', { replace: true })
  const { article } = useParams()
  console.log(article)

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      title: e?.title,
      shortDescription: e?.description,
      text: e?.body,
      tags: [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    name: 'tags',
    control,
  })

  const onSubmit = (data) => {
    const userData = {
      title: data.title,
      description: data.shortDescription,
      body: data.text,
      tagList: data.tags.map((e) => Object.values(e).join()),
    }
    /*function getCookie() {
      return document.cookie.split('; ').reduce((acc, item) => {
        const [name, value] = item.split('=')
        acc[name] = value
        return acc
      }, {})
    }
    const cookie = getCookie()*/

    //dispatch(articleUpdate(article, userData, cookie.token))
    dispatch(articleUpdate(article, userData, localStorage.getItem('token')))
  }

  useEffect(() => {
    if (updateArticle !== null && updateArticleError === null) {
      goHome()
      reset()
      dispatch(articleUpdateClear())
    }
  }, [updateArticle, updateArticleError])

  return (
    <div className="articleEdit">
      <div className="articleEdit__wrapper">
        <h1 className="articleEdit__header">Edit article</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="articleEdit__form">
          <label className="articleEdit__form__label">
            Title
            <input
              {...register('title', {
                required: {
                  value: true,
                  message: 'requied to fill out',
                },
                maxLength: {
                  value: 20,
                  message: 'maximum 20 characters',
                },
              })}
              style={{ borderColor: errors.title ? 'red' : 'initial' }}
              placeholder="Title"
              className="articleEdit__form__label__input"
            />
            <span className="articleEdit__form__error">{errors?.title && <p>{errors.title.message}</p>}</span>
          </label>

          <label className="articleEdit__form__label">
            Short description
            <input
              {...register('shortDescription', {
                required: {
                  value: true,
                  message: 'requied to fill out',
                },
              })}
              style={{ borderColor: errors.shortDescription ? 'red' : 'initial' }}
              placeholder="Short description"
              className="articleEdit__form__label__input"
            />
            <span className="articleEdit__form__error">
              {errors?.shortDescription && <p>{errors.shortDescription.message}</p>}
            </span>
          </label>
          <label className="articleEdit__form__label">
            Text
            <input
              {...register('text', {
                required: {
                  value: true,
                  message: 'requied to fill out',
                },
              })}
              style={{ borderColor: errors.text ? 'red' : 'initial' }}
              placeholder="Text"
              className="articleEdit__form__label__input__text"
            />
            <span className="articleEdit__form__error__text">{errors?.text && <p>{errors.text.message}</p>}</span>
          </label>

          <label className="articleEdit__form__label">
            Tags
            <div className="articleEdit__form__label__wrap">
              {fields.map((field, i) => {
                return (
                  <div key={field.id} className="articleEdit__form__label__wrapper">
                    <input
                      {...register(`tags.${i}.name`)}
                      placeholder="Tag"
                      className="articleEdit__form__label__input__tags"
                    />
                    <div
                      type="submit"
                      className="articleEdit__form__label__wrapper__button--delete"
                      onClick={() => remove(i)}
                    >
                      Delete
                    </div>
                  </div>
                )
              })}
              <div type="submit" className="articleEdit__form__label__wrapper__button--add" onClick={() => append({})}>
                Add Tag
              </div>
            </div>
          </label>
          <button type="submit" className="articleEdit__form__label__button">
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

export default ArticleEdit
