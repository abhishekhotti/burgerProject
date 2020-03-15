import React from 'react';


const BurgerControls = (props) => {
    const style = {
        "textAlign": "center"
    }
    return (
        <div style = {style}>
            <h1>Total Price: ${props.priceToPay}</h1>
            {props.checkBoxes}
        </div>
    );
}

export default BurgerControls;