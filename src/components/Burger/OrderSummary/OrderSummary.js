import React, { Component } from 'react';
import Aux from "../../../hoc/Aux";
import Button from "../../UI/Button/Button";
import PropTypes from "prop-types";

class OrderSummary extends Component{

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients).map((value, index) => {
            return <li key = {index}>
                <span style = {{textTransform: "capitalize"}} >
                    {value}
                </span>
                : {this.props.ingredients[value][0]}</li>
        } )
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p>Total Price: ${this.props.totalPrice}</p>
                <p>Continue to Checkout?</p>
                <Button btnType = "Danger" clicked = {this.props.cancelButtonHandler}>CANCEL</Button>
                <Button btnType = "Success" clicked = {this.props.acceptButtonHandler}>CONTINUE</Button>
            </Aux>
        );
    }
}

OrderSummary.propTypes = {
    ingredients: PropTypes.object.isRequired,
    cancelButtonHandler: PropTypes.func.isRequired,
    acceptButtonHandler: PropTypes.func.isRequired
}

export default OrderSummary;