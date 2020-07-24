export const SIGNUP = 'SIGNUP'
export const LOGIN = 'LOGIN';

export const signup = (email, password) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDB5zbLyW4f8WMO2ixxusUbcgLQ255T1z0', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true
            })
        })
        if(!response.ok) {
            throw new Error('Something when wrong')
        }
        const resData = await response.json()
        dispatch({
            type: SIGNUP
        })
    }
}

export const login =(email, password) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDB5zbLyW4f8WMO2ixxusUbcgLQ255T1z0', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true
            })
        })

        const resData = await response.json();
        if(!response.ok) {
            const errorId = resData.error.message;
            let message = 'Something went wrong!'
            if (errorId === 'EMAIL_NOT_FOUND') {
                message = 'This email could not be found'
            } else if (errorId === 'INVALID_PASSWORD') {
                message = 'This password is not valid!'
            }
            throw new Error(message)
        }
        dispatch({
            type: LOGIN,
            userInfo: resData
        })
    }
} 