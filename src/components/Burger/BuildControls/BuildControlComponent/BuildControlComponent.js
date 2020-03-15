import React from 'react';
import PropType from 'prop-types';
import classes from '../BuildControlComponent/BuildControlComponent.css';
import ControllerContext from "../../../../context/burgerControllerContext";
import Aux from "../../../../hoc/Aux"

const BuildControlComponent = props => {
    return (
        <div className = {classes.BuildControl}>
            <div className = {classes.Label}>{props.ingredientName}</div>
            <ControllerContext.Consumer>
                { (context) => (
                    <Aux>
                        <button onClick = {(event) => context.controller(event, props.type)} className={classes.Less}>Less</button>
                        <button onClick = {(event) => context.controller(event, props.type)} className={classes.More}>More</button>
                    </Aux>
                 ) }
            </ControllerContext.Consumer>
        </div>
        
    )
}

BuildControlComponent.propType = {
    ingredientName: PropType.string.isRequired,
    buttonClick: PropType.func.isRequired
}

export default BuildControlComponent;