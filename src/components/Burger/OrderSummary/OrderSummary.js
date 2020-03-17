import React from 'react';
import Aux from "../../../hoc/Aux";
import Button from "../../UI/Button/Button";

const orderSummary = props => {
    const ingredientSummary = Object.keys(props.ingredients).map((value, index) => {
        return <li key = {index}>
            <span style = {{textTransform: "capitalize"}} >
                {value}
            </span>
            : {props.ingredients[value][0]}</li>
    } )
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Total Price: ${props.totalPrice}</p>
            <p>Continue to Checkout?</p>
            <Button btnType = "Danger" clicked = {props.cancelButtonHandler}>CANCEL</Button>
            <Button btnType = "Success" clicked = {props.acceptButtonHandler}>CONTINUE</Button>
        </Aux>
    );
}

export default orderSummary;