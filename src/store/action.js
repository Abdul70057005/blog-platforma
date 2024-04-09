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

export function articlesLoad(page = 1) {
    let offset
    if(page === 1) {
        offset = 0
    }
    if(page === 2) {
        offset = 5
    }
    if(page === 3) {
        offset = 10
    }
    if(page === 4) {
        offset = 15
    }
    if(page === 5) {
        offset = 20
    }
    return async (dispatch) => {
        try{
            dispatch(spinOn())
            let response = await fetch(`https://blog.kata.academy/api/articles?limit=5&offset=${offset}`)
            if(!response.ok) {
                throw new Error('Ошибка')
            }
            const jsonData = await response.json()
            dispatch({
                type: ARTICLES_LOAD,
                payload: jsonData
            })
            dispatch(spinOff())
        } catch (error) {
            console.log(error.message)
        }
    }
}

// Article

export const ARTICLE_LOAD = 'ARTICLE_LOAD'

export function articleLoad(article) {
    return async (dispatch) => {
        try{
            dispatch(spinOn())
            let response = await fetch(`https://blog.kata.academy/api/articles/${article}`)
            if(!response.ok) {
                throw new Error('Ошибка')
            }
            const jsonData = await response.json()
            dispatch({
                type: ARTICLE_LOAD,
                payload: jsonData
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
    console.log(JSON.stringify({user: data}))
    const url = 'https://blog.kata.academy/api/users'
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({user: data})
    }
    return async (dispatch) => {
        try {
            let response = await fetch(url, options)
            if(!response.ok) {
                const errorData = await response.json()
                dispatch(userRegistrationError(errorData))
            } else {
                dispatch(userRegistrationError(null))
                const jsonData = await response.json()
                dispatch({
                    type: USER_REGISTRATION,
                    payload: jsonData
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
        body: JSON.stringify({user: data})
    }
    return async (dispatch) => {
        try {
            let response = await fetch(url, options)
            if(!response.ok) {
                const errorData = await response.json()
                dispatch(userLoginError(errorData))
            } else {
                dispatch(userLoginError(null))
                const jsonData = await response.json()
                dispatch({
                    type: USER_LOGIN,
                    payload: jsonData
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
        }
        
    }
    return async (dispatch) => {
        try {
            let response = await fetch(url, options)
            if(!response.ok) {
                throw new Error('Ошибка')
            }
            const jsonData = await response.json()
            dispatch({
                type: USER_CURRENT,
                payload: jsonData
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
        body: JSON.stringify({user: data})
    }
    return async (dispatch) => {
        try {
            let response = await fetch(url, options)
            if(!response.ok) {
                const errorData = await response.json()
                dispatch(userUpdateError(errorData))
            } else {
                dispatch(userUpdateError(null))
                const jsonData = await response.json()
                dispatch({
                    type: USER_UPDATE,
                    payload: jsonData
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

