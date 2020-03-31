import * as actionTypes from "../actions/actionTypes";

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.authStart:
            return {
                ...state,
                error: null,
                loading: true
            }
        case actionTypes.authSuccess:
            return {
                ...state,
                token: action.idToken,
                userId: action.localId,
                error: null,
                loading: false
            }
        case actionTypes.authFail:
            return {
                ...state,
                error: action.error,
                loading: false
            }
        case actionTypes.authLogout:
            return {
                ...state,
                token: null,
                userId: null
            }
        default:
            return state
    }
};

export default reducer;