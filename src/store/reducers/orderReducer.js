import * as actionTypes from "../actions/actionTypes";

const initialState = {
    orders: [],
    loading: false,
    purchased: false,
    orderFetching: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.fetchOrdersInit:
            return{
                ...state, 
                orderFetching: true
            }
        case actionTypes.fetchOrdersSuccess:
            return {
                ...state,
                orders: action.OrderData,
                orderFetching: false
            }
        case actionTypes.fetchOrderFail:
            return {
                ...state,
                orders: ["Orders could not be fetched"],
                orderFetching: false
            }
        case actionTypes.purchaseInit:
            return{
                ...state,
                purchased: false
            }
        case actionTypes.purchaseBurgerStart:
            return{
                ...state,
                loading: true
            }
        case actionTypes.formSubmissionSuccess:
            const newOrder = {
                ...action.OrderData,
                id: action.orderId
            }
            return {
                ...state,
                loading: false,
                purchased: true,
                orders: [...state.orders, newOrder]
            }
        case actionTypes.formSubmissionFail:
            return{
                ...state,
                loading: false
            }
        default:
            return state;
    }
}

export default reducer;