import * as actionTypes from "../actions/actionTypes";
const staticState = {
    ingredients: null,
    totalPrice: 2,
    error: false,
    building: true
}

const reducer = (state = staticState, action) => {
    switch(action.type){
        case(actionTypes.addIngredient):
            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientType]: [state.ingredients[action.ingredientType][0] + 1, state.ingredients[action.ingredientType][1]]
                },
                totalPrice: state.totalPrice + state.ingredients[action.ingredientType][1],
                building: true
            }
        case(actionTypes.removeIngredient):
        return {
            ...state,
            ingredients:{
                ...state.ingredients,
                [action.ingredientType]: [state.ingredients[action.ingredientType][0] - 1, state.ingredients[action.ingredientType][1]]
            },
            totalPrice: state.totalPrice - state.ingredients[action.ingredientType][1],
            building: true
        }
        case(actionTypes.setIngredients):
        return {
            ...state,
            ingredients: action.ingredientToUpdate,
            error: false,
            totalPrice: 2,
            building: false
        }
        case(actionTypes.fetchIngredientsFailed):
        return{
            ...state,
            error: true
        }
        default:
            return {...state}
    }
}

export default reducer;