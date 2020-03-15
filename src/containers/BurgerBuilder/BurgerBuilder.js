import React, { Component } from 'react';
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import PriceMonitor from "../../components/PriceMonitor/PriceMonitor";
import BuildContols from '../../components/Burger/BuildControls/BuildControls';
import ControllerContext from "../../context/burgerControllerContext";

class BurgerBuilder extends Component{
    state = {
        burgerIngredients: {
            "meat": [0, 2],
            "cheese": [0, 3],
            "salad": [0, 2],
            "bacon": [0, 5],
        },
        totalPrice: 2
    }

    controlIngredientsHandler = (event, value) => {
        let newState = {...this.state};
        if( event.target.innerHTML === "More"){
            newState.burgerIngredients[value][0] = newState.burgerIngredients[value][0] + 1;
            newState.totalPrice += newState.burgerIngredients[value][1];
        }
        else if(this.state.burgerIngredients[value][0] > 0) {
            newState.burgerIngredients[value][0] = newState.burgerIngredients[value][0] - 1;
            newState.totalPrice -= newState.burgerIngredients[value][1];
        }
        this.setState(newState)
    }
    
    render(){
        let lessActive = {...this.state.burgerIngredients};
        for(let item in lessActive){
            lessActive[item] = lessActive[item][0] === 0
        }
        return (
            <Aux>
                <Burger 
                    ingredientsToRender = {this.state.burgerIngredients}  
                />
                <PriceMonitor priceToPay = {this.state.totalPrice}/>
                <ControllerContext.Provider 
                    value={
                        {
                            controller: this.controlIngredientsHandler,
                            lessButton: lessActive
                        }
                    }
                     >
                    <BuildContols />
                </ControllerContext.Provider>
            </Aux>
        );
    };
}

export default BurgerBuilder;