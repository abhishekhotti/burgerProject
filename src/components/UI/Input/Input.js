import React from 'react';
import classes from "./Input.css";

const input = (props) =>{
    let inputElement = null;
    const classesToAssign = [classes.InputElement];

    if (props.validity === "false" && props.touched === "true"){
        classesToAssign.push(classes.Invalid)
    }
    console.log(props)
    switch(props.elementtype){
        case('input'):
            inputElement = <input 
            className = {classesToAssign.join(' ')}  
            {...props} />;
            break;
        case('textarea'):
            inputElement = <textarea 
            className = {classesToAssign.join(' ')} 
            {...props}/>;
            break;
        case('select'):
            inputElement = (
                <select disabled
                    className = {classes.InputElement} 
                    {...props}>
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
            value = {props.value} 
            onChange = {props.changed}/>;
    }
    return(
        <div className = {classes.Input}>
            <label className = {classes.Label}>{props.placeholder}</label>
            {inputElement}
        </div>
    );

}

export default input;