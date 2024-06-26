import React, { useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { articleCreate, articleUpdateClear } from '../../store/action'
import './newArticle.css'

const NewArticle = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const createArticle = useSelector((state) => state.articleCreateReducer.articleCreate)
  const createArticleError = useSelector((state) => state.articleCreateReducer.articleCreateError)

  const userCur = useSelector((state) => state.listArticles.userCurrent)
  console.log(userCur)
  console.log(createArticleError)

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      tags: [{ name: '' }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    name: 'tags',
    control,
    rules: {
      required: 'please append at least 1 tag',
    },
  })

  const onSubmit = (data) => {
    const userData = {
      title: data.title,
      description: data.shortDescription,
      body: data.text,
      tagList: data.tags?.map((e) => Object.values(e).join()),
    }
    /*function getCookie() {
      return document.cookie.split('; ').reduce((acc, item) => {
        const [name, value] = item.split('=')
        acc[name] = value
        return acc
      }, {})
    }
    const cookie = getCookie()*/

    //dispatch(articleCreate(userData, cookie.token))
    dispatch(articleCreate(userData, localStorage.getItem('token')))
  }

  useEffect(() => {
    if (createArticle !== null && createArticleError === null) {
      const goHome = () => navigate('/', { replace: true })
      goHome()
      reset()
      dispatch(articleUpdateClear())
    }
  }, [createArticle, createArticleError, navigate])

  return (
    <div className="newArticle">
      <div className="newArticle__wrapper">
        <h1 className="newArticle__header">Create new article</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="newArticle__form">
          <label className="newArticle__form__label">
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
                pattern: {
                  value: /\S/,
                  message: 'field cannot consist only of spaces',
                },
              })}
              style={{ borderColor: errors.title ? 'red' : 'initial' }}
              placeholder="Title"
              className="newArticle__form__label__input"
            />
            <span className="newArticle__form__error">{errors?.title && <p>{errors.title.message}</p>}</span>
          </label>

          <label className="newArticle__form__label">
            Short description
            <input
              {...register('shortDescription', {
                required: {
                  value: true,
                  message: 'requied to fill out',
                },
                pattern: {
                  value: /\S/,
                  message: 'field cannot consist only of spaces',
                },
              })}
              style={{ borderColor: errors.shortDescription ? 'red' : 'initial' }}
              placeholder="Short description"
              className="newArticle__form__label__input"
            />
            <span className="newArticle__form__error">
              {errors?.shortDescription && <p>{errors.shortDescription.message}</p>}
            </span>
          </label>
          <label className="newArticle__form__label">
            Text
            <input
              {...register('text', {
                required: {
                  value: true,
                  message: 'requied to fill out',
                },
                pattern: {
                  value: /\S/,
                  message: 'field cannot consist only of spaces',
                },
              })}
              style={{ borderColor: errors.text ? 'red' : 'initial' }}
              placeholder="Text"
              className="newArticle__form__label__input__text"
            />
            <span className="newArticle__form__error__text">{errors?.text && <p>{errors.text.message}</p>}</span>
          </label>

          <label className="newArticle__form__label">
            Tags
            <div className="newArticle__form__label__wrap">
              {fields.map((field, i) => {
                return (
                  <div key={field.id} className="newArticle__form__label__wrapper">
                    <div className="newArticle__form__label__wrapper__input">
                      <input
                        {...register(`tags.${i}.name`, {
                          required: {
                            value: true,
                            message: 'requied to fill out iuuuuuu',
                          },
                          pattern: {
                            value: /\S/,
                            message: 'field cannot consist only of spaces',
                          },
                        })}
                        style={{
                          borderColor: errors?.tags && errors?.tags[i] && errors?.tags[i].name ? 'red' : 'initial',
                        }}
                        placeholder="Tag"
                        className="newArticle__form__label__input__tags"
                      />
                      <div
                        type="submit"
                        className="newArticle__form__label__wrapper__button--delete"
                        onClick={() => remove(i)}
                      >
                        Delete
                      </div>
                    </div>
                    <span className="newArticle__form__error__tags">
                      {errors?.tags && errors?.tags[i] && errors?.tags[i].name && (
                        <p>required field or field consists only of spaces</p>
                      )}
                    </span>
                  </div>
                )
              })}
              <span className="newArticle__form__error__tags--length">{errors.tags?.root?.message}</span>
              <div type="submit" className="newArticle__form__label__wrapper__button--add" onClick={() => append({})}>
                Add Tag
              </div>
            </div>
          </label>
          <button type="submit" className="newArticle__form__label__button">
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

export default NewArticle

/*
<>
                <input
                  {...register('tags', {
                    required: {
                      value: true,
                      message: 'requied to fill out',
                    },
                  })}
                  style={{ borderColor: errors?.tags ? 'red' : 'initial' }}
                  placeholder="Tag"
                  className="newArticle__form__label__input__tags"
                />
                <span className="newArticle__form__error__tags">{errors?.tags && <p>{errors.tags.message}</p>}</span>
              </>
              */
