import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import './profile.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import isUrl from 'is-url'

import { userUpdate, userClear } from '../../store/action'

const Profile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const updateUser = useSelector((state) => state.listArticles.userUpdate)
  const userUpdateError = useSelector((state) => state.listArticles.userUpdateError)
  const userCur = useSelector((state) => state.listArticles.userCurrent)
  const goHome = () => navigate('/', { replace: true })
  console.log(userCur)
  console.log(updateUser)
  console.log(userUpdateError?.errors)

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setError,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      username: userCur?.username,
      emailAddress: userCur?.email,
    },
  })

  /*function getCookie() {
    return document.cookie.split('; ').reduce((acc, item) => {
      const [name, value] = item.split('=')
      acc[name] = value
      return acc
    }, {})
  }
  const cookie = getCookie()*/

  const onSubmit = (data) => {
    const userData = {
      username: data.username,
      email: data.emailAddress,
      password: data.password,
      image: data.avatar,
    }
    if (userCur.username === userData.username && userCur.email === userData.email) {
      //dispatch(userUpdate(userData, cookie.token))
      dispatch(userUpdate(userData, localStorage.getItem('token')))
    } else {
      if (userCur.username !== userData.username) {
        setError('username', {
          type: 'manual',
          message: 'username doesnt match',
        })
      }
      if (userCur.email !== userData.email) {
        setError('emailAddress', {
          type: 'manual',
          message: 'email doesnt match',
        })
      }
    }
  }

  useEffect(() => {
    if (updateUser !== null && userUpdateError === null) {
      goHome()
      reset()
      dispatch(userClear())
    }
  }, [updateUser, userUpdateError])

  return (
    <div className="profile">
      <div className="profile__wrapper">
        <h1 className="profile__header">Edit Profile</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="profile__form">
          <label className="profile__form__label">
            Username
            <input
              {...register('username', {
                required: {
                  value: true,
                  message: 'requied to fill out',
                },
                minLength: {
                  value: 3,
                  message: 'minimum 3 characters',
                },
                maxLength: {
                  value: 20,
                  message: 'maximum 20 characters',
                },
                pattern: {
                  value: /^[a-z][a-z0-9]*$/,
                  message: 'only lowercase English letters and numbers',
                },
              })}
              style={{ borderColor: errors.username ? 'red' : 'initial' }}
              placeholder="Username"
              className="profile__form__label__input"
            />
            <span className="profile__form__error">{errors?.username && <p>{errors.username.message}</p>}</span>
          </label>
          <label className="profile__form__label">
            Email address
            <input
              type="email"
              {...register('emailAddress', {
                required: {
                  value: true,
                  message: 'requied to fill out',
                },
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'email entered incorrectly',
                },
              })}
              style={{ borderColor: errors.emailAddress ? 'red' : 'initial' }}
              placeholder="Email address"
              className="profile__form__label__input"
            />
            <span className="profile__form__error">{errors?.emailAddress && <p>{errors.emailAddress.message}</p>}</span>
          </label>
          <label className="profile__form__label">
            New Password
            <input
              type="password"
              {...register('password', {
                required: {
                  value: true,
                  message: 'requied to fill out',
                },
                minLength: {
                  value: 6,
                  message: 'minimum 6 characters',
                },
                maxLength: {
                  value: 40,
                  message: 'maximum 40 characters',
                },
              })}
              style={{ borderColor: errors.password ? 'red' : 'initial' }}
              placeholder="New Password"
              className="profile__form__label__input"
            />
            <span className="profile__form__error">{errors?.password && <p>{errors.password.message}</p>}</span>
          </label>
          <label className="profile__form__label">
            Avatar image (url)
            <input
              {...register('avatar', {
                required: {
                  value: true,
                  message: 'requied to fill out',
                },
                validate: {
                  isValidUrl: (value) => isUrl(value) || 'Please enter a valid URL',
                },
              })}
              style={{ borderColor: errors.avatar ? 'red' : 'initial' }}
              placeholder="Avatar image"
              className="profile__form__label__input"
            />
            <span className="profile__form__error">{errors?.avatar && <p>{errors.avatar.message}</p>}</span>
          </label>
          <button type="submit" className="signUp__form__label__button">
            Save
          </button>
        </form>
      </div>
    </div>
  )
}

export default Profile
