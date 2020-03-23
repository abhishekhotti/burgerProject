import React from 'react';
import classes from "./Input.css";

const input = (props) =>{
    let inputElement = null;
    switch(props.elementtype){
        case('input'):
            inputElement = <input 
            className = {classes.InputElement}  
            {...props} 
            value = {props.value}/>;
            break;
        case('textarea'):
            inputElement = <textarea 
            className = {classes.InputElement} 
            {...props}
            value = {props.value}/>;
            break;
        case('select'):
            inputElement = (
                <select 
                    className = {classes.InputElement} 
                    value = {props.value}> 
                    {props.type.map((option) => (
                        <option key = {option.value} value = {option.value}>{option.display} </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input 
            className = {classes.InputElement} 
            {...props.elementConfig} 
            value = {props.value} />;
    }
    return(
        <div className = {classes.Input}>
            <label className = {classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );

}

export default input;