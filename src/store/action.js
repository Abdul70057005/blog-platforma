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