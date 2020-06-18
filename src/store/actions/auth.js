import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type:actionTypes.AUTH_START
    }
}

export const authSuccess = token => {
    return {
        type:actionTypes.AUTH_SUCCESS,
        token:token
    }
}

export const authFail = error => {
    return {
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}

export const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('expirtaionDate')
    return {
        type:actionTypes.AUTH_LOGOUT
    }
}


 export const checkAuthTimeout = expirtaionTime => {
    return dispath => {
        setTimeout(() => {
            dispath(logout())
        }, expirtaionTime * 1000)
    }
}

export const authLogin = (username,password) => {
    return dispath => {
        dispath(authStart());
        axios.post('https://strider-blog.herokuapp.com/rest-auth/login/', {
            username:username,
            password:password
        })
        .then(res => {
            const token = res.data.key;
            const expirtaionDate= new Date(new Date().getTime()+3600 * 1000);
            localStorage.setItem('token',token);
            localStorage.setItem('expirtaionDate',expirtaionDate);
            dispath(authSuccess(token))
            dispath(checkAuthTimeout(3600))
        })
        .catch (err => {
            dispath(authFail(err))
        })
    }
}

export const authSignup = (username, email, password1, password2) => {
    return dispath => {
        dispath(authStart());
        axios.post('https://strider-blog.herokuapp.com/rest-auth/registration/', {
            username:username,
            email:email,
            password1:password1,
            password2:password2
        })
        .then(res => {
            const token = res.data.key;
            const expirtaionDate= new Date(new Date().getTime()+3600 * 1000);
            localStorage.setItem('token',token);
            localStorage.setItem('expirtaionDate',expirtaionDate);
            dispath(authSuccess(token))
            dispath(checkAuthTimeout(3600))
        })
        .catch (err => {
            dispath(authFail(err))
        })
    }
}

export const authCheckState = () => {
    return dispath => {
        const token = localStorage.getItem('token');
        if (token === undefined) {
            dispath (logout())
        }else {
            const expirtaionDate = new Date (localStorage.getItem('expirtaionDate'))
            if (expirtaionDate <= new Date() ) {
                dispath (logout());
            }else {
                dispath (authSuccess(token))
                dispath (checkAuthTimeout((expirtaionDate.getTime() - new Date().getTime())/1000 ))
            }
        }
    }
}


