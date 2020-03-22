import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import classes from '../BuildControlComponent/BuildControlComponent.css';
import ControllerContext from "../../../../context/burgerControllerContext";

const BuildControlComponent = props => {
    const controlContext = useContext(ControllerContext);
    return (
        <div className = {classes.BuildControl}>
            <div className = {classes.Label}>{props.ingredientName}</div>
            <button 
            onClick = {(event) => controlContext.controller(event, props.type)} 
            className={classes.Less}
            disabled = {controlContext.lessButton[props.type]}
            >
                Less
            </button>
            <button 
            onClick = {(event) => controlContext.controller(event, props.type)} 
            className={classes.More}>
                More
            </button>
        </div>
    )
}

BuildControlComponent.propTypes = {
    ingredientName: PropTypes.string.isRequired,
}

export default BuildControlComponent;