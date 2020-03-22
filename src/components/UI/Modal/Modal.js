import React, { Component } from 'react';
import classes from "../Modal/Modal.css";
import Aux from "../../../hoc/Aux";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.show !== this.props.show || this.props.children !== nextProps.children ; 
    }
    render() {
        return (
            <Aux>
                <Backdrop show = {this.props.show} hideModal = {this.props.hideModal} />
                <div 
                className={classes.Modal} 
                style = {{
                    transform: this.props.show ? 'translateY(0)' : "translateY(-100vh)",
                    opacity: this.props.show ? "1" : "0"
                }}
                >
                    {this.props.children}
                </div>
            </Aux>
        )
    }
}

export default Modal;