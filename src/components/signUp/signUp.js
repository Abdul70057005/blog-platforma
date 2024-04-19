import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import './signUp.css'
import { useDispatch, useSelector } from 'react-redux'
import { userRegistration, userClear } from '../../store/action'
import { Link } from 'react-router-dom/dist'
import { useNavigate } from 'react-router-dom/dist'

const SignUp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.listArticles.user)
  const userError = useSelector((state) => state.listArticles.userError)

  console.log(user)
  console.log(userError)

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
    setError,
  } = useForm({
    mode: 'onChange',
  })

  const onSubmit = (data) => {
    const userData = {
      username: data.username,
      email: data.emailAddress,
      password: data.password,
    }
    console.log(JSON.stringify(userData))
    dispatch(userRegistration(userData))
    console.log(user !== null)
  }

  useEffect(() => {
    if (userError !== null) {
      if (userError?.errors.username === 'is already taken.') {
        setError('username', {
          type: 'manual',
          message: 'is already taken',
        })
      }
      if (userError?.errors.email === 'is already taken.') {
        setError('emailAddress', {
          type: 'manual',
          message: 'is already taken',
        })
      }
    }

    if (user !== null && userError === null) {
      const goHome = () => navigate('/', { replace: true })
      goHome()
      reset()
      dispatch(userClear())
    }
  }, [userError, user, navigate])

  return (
    <div className="signUp">
      <div className="signUp__wrapper">
        <h1 className="signUp__header">Create new account</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="signUp__form">
          <label className="signUp__form__label">
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
              className="signUp__form__label__input"
            />
            <span className="signUp__form__error">{errors?.username && <p>{errors.username.message}</p>}</span>
          </label>

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
            <span className="signUp__form__error">{errors?.emailAddress && <p>{errors.emailAddress.message}</p>}</span>
          </label>
          <label className="signUp__form__label">
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
              className="signUp__form__label__input"
            />
            <span className="signUp__form__error">{errors?.password && <p>{errors.password.message}</p>}</span>
          </label>

          <label className="signUp__form__label">
            Repeat Password
            <input
              type="password"
              {...register('repeatPassword', {
                required: {
                  value: true,
                  message: 'requied to fill out',
                },
                validate: (value) => {
                  const { password } = getValues()
                  return password === value || 'Password mismatch'
                },
              })}
              style={{ borderColor: errors.repeatPassword ? 'red' : 'initial' }}
              placeholder="Repeat Password"
              className="signUp__form__label__input"
            />
            <span className="signUp__form__error">
              {errors?.repeatPassword && <p>{errors.repeatPassword.message}</p>}
            </span>
          </label>
          <label className="signUp__form__label">
            <div className="signUp__form__label__check">
              <input
                {...register('checkbox', {
                  required: {
                    value: true,
                    message: 'requied to fill out',
                  },
                })}
                type="checkbox"
                className="signUp__form__label__input"
              />
              <div>I agree to the proccessing of my personal information</div>
            </div>
          </label>
          <button type="submit" className="signUp__form__label__button">
            Create
          </button>
          <div className="signUp__form__label__text">
            Don't an account?{' '}
            <Link to="/sign-in" className="url__sign-in">
              {' '}
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp
