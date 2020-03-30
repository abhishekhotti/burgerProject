import * as actionTypes from "./actionTypes";
import axios from "../../axios";

export const formSubmission_Success = (id, orderData) => {
    return {
        type: actionTypes.formSubmissionSuccess,
        orderId: id,
        orderData: orderData
    };
};

export const formSubmissionFail = (error) => {
    return {
        type: actionTypes.formSubmissionFail,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return{
        type: actionTypes.purchaseBurgerStart
    }
}

export const puchaseInit = () => {
    return {
        type: actionTypes.purchaseInit
    }
}

export const purchaseBurger = (orderData, token) => {
    console.log(token)
    return dispatch => {
        dispatch(purchaseBurgerStart())
        axios.post("/orders.json?auth=" + token, orderData).then(response => {
            dispatch(formSubmission_Success(response.data.name, orderData))
        })
        .catch(error => {
            dispatch(formSubmissionFail(error))
        })
    }
}