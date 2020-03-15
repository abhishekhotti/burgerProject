import React from 'react';


const PriceMonitor = (props) => {
    const style = {
        "textAlign": "center"
    }
    return (
        <div style = {style}>
            <h1>Total Price: ${props.priceToPay}</h1>
        </div>
    );
}

export default PriceMonitor;