import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = (props) => {
    return (
        <div>
            <input 
            type = "checkbox" 
            value = {props.checkBoxVal} 
            onChange = {props.checkBoxChanged} 
            name = {props.checkBoxVal}
            checked = {props.selectBox} 
            />
            <label onClick= {props.checkBoxChanged} htmlFor = {props.checkBoxVal} > {props.checkBoxVal} </label>
        </div>
    )
}

Checkbox.propTypes = {
    checkBoxVal: PropTypes.string.isRequired,
    checkBoxChanged: PropTypes.func.isRequired
};

export default Checkbox;