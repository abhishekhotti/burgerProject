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
import {connect} from 'react-redux';
// import * as actionTypes from "../../store/actions/actionTypes";
import * as actionCreator from "../../store/actions/index";

class BurgerBuilder extends Component{
    state = {
        // burgerIngredients: null,
        purchasable: true,
        showModal: false,
    }

    updatePurchaseState = (newState) => {
        const ingredientCount = Object.keys(newState.burgerIngredients).map(value => {
            return this.state.burgerIngredients[value][0]
        }).reduce((sum, el) => {
            return sum + el;
        }, 0)
        this.setState({purchasable: ingredientCount === 0})
    }

    updateOrderButtonViaStore = () => {
        const ingredientCount = Object.keys(this.props.ingredientsFromStore).map(value => {
            return this.props.ingredientsFromStore[value][0]
        }).reduce((sum, el) => {
            return sum + el;
        }, 0)
        return ingredientCount === 0
    }

    controlIngredientsHandler = (event, value) => {
        // let newState = {...this.state};
        if( event.target.innerHTML === "More"){
            // newState.burgerIngredients[value][0] = newState.burgerIngredients[value][0] + 1;
            // newState.totalPrice += newState.burgerIngredients[value][1];
            this.props.onIngredientAdded(value);
        }
        else if(this.props.ingredientsFromStore[value][0] > 0) {
            this.props.onIngredientRemove(value);

            // newState.burgerIngredients[value][0] = newState.burgerIngredients[value][0] - 1;
            // newState.totalPrice -= newState.burgerIngredients[value][1];
        }
        // this.setState(newState)
        // this.updatePurchaseState(newState)
    }

    showModalHandler = _ => {
        if(this.props.isAuthenticated){
            let currModal = this.state.showModal;
            this.setState({showModal: !currModal})
        }
        else{
            this.props.history.push("/Auth");
        }
    }

    // componentDidMount = () => {
    //     axios.get('/ingredients.json').then(response => {
    //         this.setState({burgerIngredients: response.data})
    //     })
    // }

    puchaseContinueHandler = () => {
        // let queryParams = [];
        // for(let i in this.state.burgerIngredients){
        //     queryParams.push(encodeURIComponent(i)+"="+encodeURIComponent(this.state.burgerIngredients[i][0]))
        // }
        // queryParams.push("price="+this.state.totalPrice)
        // queryParams = queryParams.join("&")
        this.props.onItPurchase()
        this.props.history.push({
            pathname: "/Checkout",
            // search: "?"+queryParams
        });
    }

    componentDidMount() {
        this.props.fetchIngredientsFromServer();
    }
    
    render(){
        let lessActive = {...this.props.ingredientsFromStore};

        for(let item in lessActive){
            lessActive[item] = lessActive[item][0] === 0
        }
        let burgerLoaded = <Loading />
        // if (this.state.burgerIngredients)
        if (this.props.ingredientsFromStore)
        {
            burgerLoaded = (<Aux>
                <Burger 
                    // ingredientsToRender = {this.state.burgerIngredients}
                    ingredientsToRender = {this.props.ingredientsFromStore}

                />
                <PriceMonitor priceToPay = {this.props.priceFromStore}/>
                <ControllerContext.Provider 
                    value={
                        {
                            controller: this.controlIngredientsHandler,
                            lessButton: lessActive
                        }
                    }
                    >
                    <BuildContols 
                    isAuth = {this.props.isAuthenticated} 
                    purchaseButton = {this.updateOrderButtonViaStore()} 
                    clicked = {this.showModalHandler} />
                </ControllerContext.Provider>
            </Aux>);
        }
        return (
            <Aux>
                <Modal show = {this.state.showModal} hideModal = {this.showModalHandler}>
                    {/* {this.state.burgerIngredients ?  */}
                    {this.props.ingredientsFromStore ? 
                        !this.state.loading ? 
                            <OrderSummary 
                            // ingredients = {this.state.burgerIngredients} 
                            ingredients = {this.props.ingredientsFromStore}
                            cancelButtonHandler = {this.showModalHandler}
                            acceptButtonHandler = {this.puchaseContinueHandler}
                            totalPrice = {this.props.priceFromStore}
                            /> : <Loading />
                        : <Loading />
                    }
                </Modal>
                {burgerLoaded}
            </Aux>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        ingredientsFromStore: state.burgerBuilder.ingredients,
        priceFromStore: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.authReducer.token !== null
    };
}

const matchDispatchToProps = (dispatch) => {
    return{
        onIngredientAdded: (ingredient) => dispatch(actionCreator.addIngredient(ingredient)),
        fetchIngredientsFromServer: () => dispatch(actionCreator.initIngredients()),
        onIngredientRemove: (ingredient) => dispatch(actionCreator.removeIngredient(ingredient)),
        onItPurchase: () => dispatch(actionCreator.puchaseInit())
    };
}

export default connect(mapStateToProps, matchDispatchToProps)(withErrorHandler(BurgerBuilder, axios));