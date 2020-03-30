import React, {Component} from 'react';
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.css";
import {connect} from "react-redux";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from 'react-router-dom';

class Auth extends Component{
    state = {
        controls: {
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Mail Address"
                },
                value: '',
                isRequired:{
                    required: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: "input",
                elementConfig: {
                    type: "password",
                    placeholder: "Password"
                },
                value: '',
                isRequired:{
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        }, wholeForm: false, isSignup: false
    }

    onEnteredInput = (event, item) => {
        const updatedValue = event.target.value;
        const newStateForItem = {...this.state.controls[item]};
        newStateForItem.value = updatedValue;
        newStateForItem.touched = true;
        newStateForItem.valid = this.checkValiditiy(item, updatedValue)
        const newState = {
                            ...this.state.controls,
                            [item]: newStateForItem
                        };
        this.setState({controls: newState});
    }


    checkValiditiy = (item, newValue) => {
        if (this.state.controls[item].isRequired.minLength < newValue.length)
        {
            return true
        }
        else if (!this.state.controls[item].isRequired.minLength){
            return true
        }
        return false;
    };

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value, this.state.isSignup)
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup}
        });
    }
    
    render() {
        let redirect = null;
        if(this.props.token){
            if (this.props.building)
            {
                redirect = <Redirect to ="Checkout" />
            }
            else{
                redirect = <Redirect to="/" />
            }
        }
        const loginForm = Object.keys(this.state.controls).map(item => {
            return <Input 
            elementtype = {this.state.controls[item].elementType} 
            value = {this.state.controls[item].value}
            key = {item}
            type = {this.state.controls[item].elementConfig.type}
            placeholder = {this.state.controls[item].elementConfig.placeholder}
            onChange = {(event) => this.onEnteredInput(event, item)}
            validity = {this.state.controls[item].valid.toString()}
            touched = {this.state.controls[item].touched.toString()}
            />
        });

        let notLogin = true;
        for (let item in this.state.controls)
        {
            if(this.state.controls[item].touched === false)
            {
                notLogin = false;
                break;
            }
        }
        let submitButton = true;
        for (let item in this.state.controls)
        {
            if(this.state.controls[item].valid === false)
            {
                submitButton = false;
                break;
            }
        }
        let form = <Spinner />
        if(!this.props.loading){
            form = (
                <div>
                    <form onSubmit = {this.submitHandler}>
                        <h1>{!this.state.isSignup ? "Sign-In" : "Sign-Up"}</h1>
                        {loginForm}
                        {!notLogin ? <p>Please enter your username/password</p>:null}
                        {!this.state.controls.password.valid ? <p>The password needs atleast 6 characters</p>:null}
                        <Button activate={!submitButton} btnType = "Success">{!this.state.isSignup ? "Sign-In" : "Sign-Up"}</Button>
                    </form>
                    <Button 
                    clicked = {this.switchAuthModeHandler}
                    btnType="Success">Switch to {this.state.isSignup ? "Sign-In" : "Sign-Up"}</Button>
                </div>
            );
        }

        let errorMessage = null;
        if(this.props.error){
            errorMessage = <p>{this.props.error}</p>
        }

        return (
            <div>
                {redirect}
                <div className = {classes.Auth}>
                    {errorMessage}
                    {form}
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
    }
}

const mapStateToProps = state => {
    return {
        loading: state.authReducer.loading,
        error: state.authReducer.error,
        token: state.authReducer.token !== null,
        building: state.burgerBuilder.building
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);