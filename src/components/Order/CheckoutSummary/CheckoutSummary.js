import React from 'react';
import Burger from "../../Burger/Burger";
import Button from  "../../UI/Button/Button";
import classes from "./CheckoutSummary.css"

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We Hope It Tastes Good</h1>
            <div style={{width: "100%", margin: "auto"}}>
                <Burger ingredientsToRender = {props.burgerIngredients} />
            </div>
            <h2>Total Price: ${props.totalPrice}</h2>
            <Button 
                btnType="Danger" 
                clicked={props.clickedFailure}>
                    Cancel
            </Button>
            <Button 
                btnType="Success" 
                clicked={props.clickedSuccess}>
                    Continue
            </Button>
        </div>
    );
}

export default checkoutSummary;