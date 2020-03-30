import React, { Component } from 'react';
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Route, Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';

class Checkout extends Component{
    // constructor(props){
    //     super(props)
    //     const ingredients= {
    //             bacon: [null, 3],
    //             cheese: [null, 2],
    //             meat: [null, 4],
    //             salad: [null, 1],
    //         }
    //     var query = new URLSearchParams(this.props.location.search);
    //     let price = null;
    //     for (let param of query.entries()){
    //         if (param[0] === "price"){
    //             price = param[1]
    //         }
    //         else{
    //             ingredients[param[0]][0] = +param[1]
    //         }
    //     }
    //     this.state = ({ingredients: ingredients, totalPrice: price})
    // }

    cancelButtonHandler = () => {
        this.props.history.goBack()
    }

    acceptButtonHandler = () => {
        this.props.history.replace("/Checkout/contact-data")
    }

    render(){
        let summary = <Redirect to="/" />
        if (this.props.ingredientsFromStore){
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary 
                    clickedFailure = {this.cancelButtonHandler}
                    clickedSuccess = {this.acceptButtonHandler}
                    burgerIngredients={this.props.ingredientsFromStore}
                    totalPrice={this.props.priceFromStore} />
                    <Route 
                        path = {this.props.match.url +"/contact-data"} 
                        component={ContactData} 
                    />
                </div>
            )
        }
        return (
            summary
        );
    }
}

const setStateToProps = state => {
    return {
        ingredientsFromStore: state.burgerBuilder.ingredients,
        priceFromStore: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    }
}


export default connect(setStateToProps)(Checkout);