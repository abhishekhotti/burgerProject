import * as actionTypes from "./actionTypes";
import axios from "axios";

// https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

export const authStart = () => {
    return {
        type: actionTypes.authStart
    };
};

export const authSuccess = (idToken, localId) => {
    return {
        type: actionTypes.authSuccess,
        idToken: idToken,
        localId: localId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.authFail,
        error: error
    };
};

export const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('localId');
    return {
        type: actionTypes.authLogout
    }
}

export const tokenExpiration = (time) => {
    return dispatch => {
            setTimeout(() => {
            dispatch(logOut())
        }, time * 1000);
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDE8igCEJHy0fvXhFYeHjMVFRuHVPBZhOc";
        if (!isSignUp){
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDE8igCEJHy0fvXhFYeHjMVFRuHVPBZhOc"
        }
        axios.post(url, authData)
        .then(response => {
            console.log(response);
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('localId', response.data.localId);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(tokenExpiration(response.data.expiresIn));
        })
        .catch(error => {
            console.log(error)
            dispatch(authFail(error.response.data.error.message));
        })
    }
}

export const autoLogin = () => {
    return dispatch => {
        const tokenId = localStorage.getItem("token");
        if(tokenId === null){
            dispatch(logOut())
        }
        else{
            const localId = localStorage.getItem("localId");
            const expirationTimeFromStorage = new Date(localStorage.getItem("expirationDate"));
            if(new Date() < expirationTimeFromStorage){
                dispatch(authSuccess(tokenId, localId))
                const time = (expirationTimeFromStorage.getTime() - new Date().getTime()) / 1000
                dispatch(tokenExpiration(time))
            }
            else{
                dispatch(logOut(tokenId, localId))
            }
        }
    }
}