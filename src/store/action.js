// Spin loader

export const SPIN_OFF = 'SPIN_OFF'
export const SPIN_ON = 'SPIN_ON'

export function spinOff() {
  return {
    type: SPIN_OFF,
  }
}

export function spinOn() {
  return {
    type: SPIN_ON,
  }
}

// list Articles

export const ARTICLES_LOAD = 'ARTICLES_LOAD'

export function articlesLoad(token = null, page = 1) {
  function getCookie() {
    return document.cookie.split('; ').reduce((acc, item) => {
      const [name, value] = item.split('=')
      acc[name] = value
      return acc
    }, {})
  }
  const cookie = getCookie()
  console.log(cookie.page)
  if (cookie.page) {
    page = cookie.page
  }

  let offset
  if (page === '1') {
    offset = 0
  }
  if (page === '2') {
    offset = 5
  }
  if (page === '3') {
    offset = 10
  }
  if (page === '4') {
    offset = 15
  }
  if (page === '5') {
    offset = 20
  }
  return async (dispatch) => {
    const url = `https://blog.kata.academy/api/articles?limit=5&offset=${offset}`
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Token ${token}`,
      },
    }

    try {
      dispatch(spinOn())
      let response = await fetch(url, options)
      if (!response.ok) {
        throw new Error('Ошибка')
      }
      const jsonData = await response.json()
      dispatch({
        type: ARTICLES_LOAD,
        payload: jsonData,
      })
      dispatch(spinOff())
    } catch (error) {
      console.log(error.message)
    }
  }
}

// Article

export const ARTICLE_LOAD = 'ARTICLE_LOAD'

export function articleLoad(article, token) {
  const url = `https://blog.kata.academy/api/articles/${article}`
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Token ${token}`,
    },
  }

  return async (dispatch) => {
    try {
      dispatch(spinOn())
      let response = await fetch(url, options)
      if (!response.ok) {
        throw new Error('Ошибка')
      }
      const jsonData = await response.json()
      dispatch({
        type: ARTICLE_LOAD,
        payload: jsonData,
      })
      dispatch(spinOff())
    } catch (error) {
      console.log(error.message)
    }
  }
}

// регистрация нового пользователя

export const USER_REGISTRATION = 'USER_REGISTRATION'
export const USER_REGISTRATION_ERROR = 'USER_REGISTRATION_ERROR'

export function userRegistrationError(error) {
  return {
    type: USER_REGISTRATION_ERROR,
    payload: error,
  }
}

export function userRegistration(data) {
  const url = 'https://blog.kata.academy/api/users'
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({ user: data }),
  }
  return async (dispatch) => {
    try {
      let response = await fetch(url, options)
      if (!response.ok) {
        const errorData = await response.json()
        dispatch(userRegistrationError(errorData))
      } else {
        dispatch(userRegistrationError(null))
        const jsonData = await response.json()
        dispatch({
          type: USER_REGISTRATION,
          payload: jsonData,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}

// login пользователя

export const USER_LOGIN = 'USER_LOGIN'
export const USER_LOGIN_ERROR = 'USER_LOGIN_ERROR'

export function userLoginError(error) {
  return {
    type: USER_LOGIN_ERROR,
    payload: error,
  }
}

export function userLogin(data) {
  const url = 'https://blog.kata.academy/api/users/login'
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({ user: data }),
  }
  return async (dispatch) => {
    try {
      let response = await fetch(url, options)
      if (!response.ok) {
        const errorData = await response.json()
        dispatch(userLoginError(errorData))
      } else {
        dispatch(userLoginError(null))
        const jsonData = await response.json()
        dispatch({
          type: USER_LOGIN,
          payload: jsonData,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}

// получить залогиненного пользователя

export const USER_CURRENT = 'USER_CURRENT'

export function userCurrent(token) {
  console.log(token)
  const url = `https://blog.kata.academy/api/user?api_key=${token}`
  const options = {
    headers: {
      Authorization: `Token ${token}`,
    },
  }
  return async (dispatch) => {
    try {
      let response = await fetch(url, options)
      if (!response.ok) {
        throw new Error('Ошибка')
      }
      const jsonData = await response.json()
      dispatch({
        type: USER_CURRENT,
        payload: jsonData,
      })
    } catch (error) {
      console.log(error)
    }
  }
}

// сброс текущего пользовател log out

export const LOG_OUT = 'LOG_OUT'

export function logOut() {
  return {
    type: LOG_OUT,
  }
}

// обновить текущего поьзователя

export const USER_UPDATE = 'USER_UPDATE'
export const USER_UPDATE_ERROR = 'USER_UPDATE_ERROR'

export function userUpdateError(error) {
  return {
    type: USER_UPDATE_ERROR,
    payload: error,
  }
}

export function userUpdate(data, token) {
  const url = 'https://blog.kata.academy/api/user'
  const options = {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({ user: data }),
  }
  return async (dispatch) => {
    try {
      let response = await fetch(url, options)
      if (!response.ok) {
        const errorData = await response.json()
        dispatch(userUpdateError(errorData))
      } else {
        dispatch(userUpdateError(null))
        const jsonData = await response.json()
        dispatch({
          type: USER_UPDATE,
          payload: jsonData,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}

// new article

export const ARTICLE_CREATE = 'ARTICLE_CREATE'
export const ARTICLE_CREATE_ERROR = 'ARTICLE_CREATE_ERROR'

export function articleCreateError(error) {
  return {
    type: ARTICLE_CREATE_ERROR,
    payload: error,
  }
}

export function articleCreate(data, token) {
  const url = 'https://blog.kata.academy/api/articles'
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({ article: data }),
  }
  return async (dispatch) => {
    try {
      let response = await fetch(url, options)
      if (!response.ok) {
        const errorData = await response.json()
        dispatch(articleCreateError(errorData))
      } else {
        dispatch(articleCreateError(null))
        const jsonData = await response.json()
        dispatch({
          type: ARTICLE_CREATE,
          payload: jsonData,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}

// обновить article

export const ARTICLE_UPDATE = 'ARTICLE_UPDATE'
export const ARTICLE_UPDATE_ERROR = 'ARTICLE_UPDATE_ERROR'

export function articleUpdateError(error) {
  return {
    type: ARTICLE_UPDATE_ERROR,
    payload: error,
  }
}

export function articleUpdate(slug, data, token) {
  const url = `https://blog.kata.academy/api/articles/${slug}`
  const options = {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({ article: data }),
  }
  return async (dispatch) => {
    try {
      let response = await fetch(url, options)
      if (!response.ok) {
        const errorData = await response.json()
        dispatch(articleUpdateError(errorData))
      } else {
        dispatch(articleUpdateError(null))
        const jsonData = await response.json()
        dispatch({
          type: ARTICLE_UPDATE,
          payload: jsonData,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}

// очищение данных после обновление статьи

export const ARTICLE_UPDATE_CLEAR = 'ARTICLE_UPDATE_CLEAR'

export function articleUpdateClear() {
  return {
    type: ARTICLE_UPDATE_CLEAR,
  }
}

// очищение данных о пользователя после обновление и т.д.

export const USER_CLEAR = 'USER_CLEAR'

export function userClear() {
  return {
    type: USER_CLEAR,
  }
}

// delete articles

export const ARTICLE_DELETE = 'ARTICLE_DELETE'
export const ARTICLE_DELETE_ERROR = 'ARTICLE_DELETE_ERROR'

export function articleDeleteError(error) {
  return {
    type: ARTICLE_DELETE_ERROR,
    payload: error,
  }
}

export function articleDelete(slug, token) {
  const url = `https://blog.kata.academy/api/articles/${slug}`
  const options = {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Token ${token}`,
    },
  }
  return async (dispatch) => {
    try {
      let response = await fetch(url, options)
      if (response.ok) {
        console.log('delete')
      }
      if (!response.ok) {
        const errorData = await response.json()
        dispatch(articleDeleteError(errorData))
      } else {
        dispatch(articleDeleteError(null))
        const jsonData = await response.status
        dispatch({
          type: ARTICLE_DELETE,
          payload: jsonData,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}

// лайк article

export const ARTICLE_FAVORITE = 'ARTICLE_FAVORITE'
export const ARTICLE_FAVORITE_ERROR = 'ARTICLE_FAVORITE_ERROR'

export function articleFavoriteError(error) {
  return {
    type: ARTICLE_FAVORITE_ERROR,
    payload: error,
  }
}

export function articleFavorite(slug, token) {
  const url = `https://blog.kata.academy/api/articles/${slug}/favorite`
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Token ${token}`,
    },
  }
  return async (dispatch) => {
    try {
      let response = await fetch(url, options)
      if (!response.ok) {
        const errorData = await response.json()
        dispatch(articleFavoriteError(errorData))
      } else {
        dispatch(articleFavoriteError(null))
        const jsonData = await response.json()
        dispatch({
          type: ARTICLE_FAVORITE,
          payload: jsonData,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}

// удаление лайка article

export const ARTICLE_DELETE_FAVORITE = 'ARTICLE_DELETE_FAVORITE'
export const ARTICLE_DELETE_FAVORITE_ERROR = 'ARTICLE_DELETE_FAVORITE_ERROR'

export function articleDeleteFavoriteError(error) {
  return {
    type: ARTICLE_FAVORITE_ERROR,
    payload: error,
  }
}

export function articleDeleteFavorite(slug, token) {
  const url = `https://blog.kata.academy/api/articles/${slug}/favorite`
  const options = {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Token ${token}`,
    },
  }
  return async (dispatch) => {
    try {
      let response = await fetch(url, options)
      if (!response.ok) {
        const errorData = await response.json()
        dispatch(articleDeleteFavoriteError(errorData))
      } else {
        dispatch(articleDeleteFavoriteError(null))
        const jsonData = await response.json()
        dispatch({
          type: ARTICLE_DELETE_FAVORITE,
          payload: jsonData,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}
