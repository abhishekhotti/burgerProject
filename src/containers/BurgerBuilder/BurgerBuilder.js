import React, { Component } from 'react';
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import Checkbox from "../../components/Checkbox/Checkbox";
import BurgerControls from "../../components/BugerControl/BurgerControls";

class BurgerBuilder extends Component{
    state = {
        burgerIngredients: {
            "bread-top": [false, 1], 
            "meat": [false, 2],
            "cheese": [false, 3],
            "salad": [false, 2],
            "bacon": [false, 5],
            "bread-bottom": [false, 1],
        },
    }

    onChangeCheckBoxHandler = (event) => {
        let toCheckFor = null;
        if (event.target.htmlFor !== undefined){
            toCheckFor = event.target.htmlFor
        }
        else{
            toCheckFor = event.target.value
        }
        let newState = {...this.state.burgerIngredients}
        newState[toCheckFor][0] = !newState[toCheckFor][0]
        this.setState({burgerIngredients: newState})
    }
    
    render(){
        let totalPrice = 0
        const ingredientsToRender = Object.keys(this.state.burgerIngredients).map(value => {
            // console.log(this.state.burgerIngredients[value])
            if (this.state.burgerIngredients[value][0] === true){
                totalPrice += this.state.burgerIngredients[value][1]
                return value
            }
            return null;
        })
        const checkBoxes = Object.keys(this.state.burgerIngredients).map((value, index) => {
            return (
                <Checkbox 
                checkBoxVal = {value} 
                key = {index}
                checkBoxChanged = {(event) => {this.onChangeCheckBoxHandler(event)}}
                selectBox = {this.state.burgerIngredients[value][0]}
                />
            )
        });
        return (
            <Aux>
                <Burger ingredientsToRender = {ingredientsToRender} />
                <BurgerControls checkBoxes = {checkBoxes} priceToPay = {totalPrice}/>
                <div>Build Controls</div>
            </Aux>
        );
    };
}

export default BurgerBuilder;