import React from 'react';


const PriceMonitor = (props) => {
    const style = {
        "textAlign": "center",
    }
    return (
        <div style = {style}>
            <p style={{"margin": "unset"}}>Total Price: ${props.priceToPay}</p>
        </div>
    );
}

export default PriceMonitor;