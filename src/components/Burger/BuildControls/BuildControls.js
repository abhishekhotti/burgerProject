import React from 'react';
import classes from '../BuildControls/BuildControls.css';
import BuildControlComponent from "../BuildControls/BuildControlComponent/BuildControlComponent";

const controls = [
    {label: 'Salad', type: "salad"},
    {label: 'Bacon', type: "bacon"},
    {label: 'Cheese', type: "cheese"},
    {label: 'Meat', type: "meat"},

]

const BuildContols = props => {
    return (
        <div className = {classes.BuildContols}>
            {controls.map((value, index) => {
                return (
                    <BuildControlComponent 
                    ingredientName = {value.label}
                    key = {index}
                    type = {value.type}
                    />
                );
            })}
        </div>
    )
}

export default BuildContols;