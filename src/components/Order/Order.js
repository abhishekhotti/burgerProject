import React from 'react';
import classes from "./Order.css"

const order = props => {
    return (
        <div className={classes.Order}>
            <p>Ingredients: <span style ={{
                display: "inline-block",
                textTransform: "capitalize",
                margin: "0 8px",
                border: "1px solid #ccc",
                padding: "5px"
                }}>{props.children}</span></p>
            <p>Price: <b>${props.priceForOrder}</b></p>
        </div>
    );
}

export default order;