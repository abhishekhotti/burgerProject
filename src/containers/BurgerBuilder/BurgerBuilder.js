import React, { Component } from 'react';
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import PriceMonitor from "../../components/PriceMonitor/PriceMonitor";
import BuildContols from '../../components/Burger/BuildControls/BuildControls';
import ControllerContext from "../../context/burgerControllerContext";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"
import axios from "../../axios";
import Loading from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class BurgerBuilder extends Component{
    state = {
        burgerIngredients: null,
        totalPrice: 2,
        purchasable: true,
        showModal: false,
        loading: false
    }

    updatePurchaseState = (newState) => {
        const ingredientCount = Object.keys(newState.burgerIngredients).map(value => {
            return this.state.burgerIngredients[value][0]
        }).reduce((sum, el) => {
            return sum + el;
        }, 0)
        this.setState({purchasable: ingredientCount === 0})
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
        this.updatePurchaseState(newState)
    }

    showModalHandler = _ => {
        let currModal = this.state.showModal;
        this.setState({showModal: !currModal})
    }

    componentDidMount = () => {
        axios.get('/ingredients.json').then(response => {
            this.setState({burgerIngredients: response.data})
        })
    }

    puchaseContinueHandler = () => {
        this.setState({loading: true})
        const order = {
            ingredients: Object.keys(this.state.burgerIngredients).reduce((newObj, currVal) => 
                {
                    return {...newObj, [currVal]: this.state.burgerIngredients[currVal][0]}
                }, {}),
            price: this.state.totalPrice,
            customer: {
                name: "Abhi",
                address: {
                    street: "Great Mall",
                    zipCode: "13834",
                    country: "Germany"
                },
                email: "abhi@abhic.om"
            },
            deliveryMethod: "fastest"
        }
        axios.post("/orders.json", order).then(response => {
            this.setState({loading: false, showModal: false});
        })
        .catch(error => {
            console.log(error)
            this.setState({loading: false, showModal: false});
        })
    }
    
    render(){
        let lessActive = {...this.state.burgerIngredients};
        for(let item in lessActive){
            lessActive[item] = lessActive[item][0] === 0
        }
        let burgerLoaded = <Loading />
        if (this.state.burgerIngredients)
        {
            burgerLoaded = (<Aux>
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
                    <BuildContols purchaseButton = {this.state.purchasable} clicked = {this.showModalHandler} />
                </ControllerContext.Provider>
            </Aux>);
        }
        return (
            <Aux>
                <Modal show = {this.state.showModal} hideModal = {this.showModalHandler}>
                    {this.state.burgerIngredients ? 
                        !this.state.loading ? 
                            <OrderSummary 
                            ingredients = {this.state.burgerIngredients} 
                            cancelButtonHandler = {this.showModalHandler}
                            acceptButtonHandler = {this.puchaseContinueHandler}
                            totalPrice = {this.state.totalPrice}
                            /> : <Loading />
                        : <Loading />
                    }
                </Modal>
                {burgerLoaded}
            
            </Aux>
        );
    };
}

export default withErrorHandler(BurgerBuilder, axios);