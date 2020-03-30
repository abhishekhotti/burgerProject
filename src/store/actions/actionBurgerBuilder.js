import * as actionTypes from '../actions/actionTypes';
import axios from "../../axios";

export const addIngredient = (name) => {
    return {
        type:  actionTypes.addIngredient,
        ingredientType: name
    }
}

export const removeIngredient = (name) => {
    return {
        type:  actionTypes.removeIngredient,
        ingredientType: name
    }
}

const ingredients = (ingredients) => {
    return {
        type: actionTypes.setIngredients,
        ingredientToUpdate: ingredients
    }
}

const ingredientsFailed = () => {
    return {
        type: actionTypes.fetchIngredientsFailed,
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json').then(response => {
            dispatch(ingredients(response.data))
        }).catch(error => {
            dispatch(ingredientsFailed())
        });
    }
}