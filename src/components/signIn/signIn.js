import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import './signIn.css'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom/dist'

import { userLogin, userCurrent, userClear } from '../../store/action'

const SignIn = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userLog = useSelector((state) => state.listArticles.userLogin)
  const userLogError = useSelector((state) => state.listArticles.userLoginError)

  console.log(userLog)
  console.log(userLogError)
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setError,
  } = useForm({
    mode: 'onChange',
  })

  const onSubmit = (data) => {
    const userData = {
      email: data.emailAddress,
      password: data.password,
    }
    dispatch(userLogin(userData))
  }

  useEffect(() => {
    if (userLogError !== null) {
      if (Object.values(userLogError.errors) == 'is invalid') {
        setError('emailAddress', {
          type: 'manual',
          message: 'is already taken',
        })
        setError('password', {
          type: 'manual',
          message: 'is already taken',
        })
      }
    }

    if (userLog !== null && userLogError === null) {
      const goHome = () => navigate('/', { replace: true })
      document.cookie = `token=${userLog.token}; path=/`
      goHome()
      reset()
      dispatch(userClear())
    }

    function getCookie() {
      return document.cookie.split('; ').reduce((acc, item) => {
        const [name, value] = item.split('=')
        acc[name] = value
        return acc
      }, {})
    }
    const cookie = getCookie()
    if (cookie.token) {
      dispatch(userCurrent(cookie.token))
    }
  }, [userLogError, userLog, navigate])

  return (
    <div className="signIn">
      <div className="signIn__wrapper">
        <h1 className="signIn__header">Sign In</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="signIn__form">
          <label className="signIn__form__label">
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
              className="signIn__form__label__input"
            />
            <span className="signIn__form__error">{errors?.emailAddress && <p>{errors.emailAddress.message}</p>}</span>
          </label>
          <label className="signIn__form__label">
            Password
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
              placeholder="Password"
              className="signIn__form__label__input"
            />
            <span className="signIn__form__error">{errors?.password && <p>{errors.password.message}</p>}</span>
          </label>
          <button type="submit" className="signIn__form__label__button">
            Login
          </button>

          <div className="signIn__form__label__text">
            Don`t an account?{' '}
            <Link to="/sign-up" className="url__sign-up">
              {' '}
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignIn
