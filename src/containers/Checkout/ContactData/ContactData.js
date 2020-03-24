import React, { Component } from 'react';
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios";
import Spinner from "../../../components/UI/Spinner/Spinner";
import {withRouter} from "react-router-dom";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component{
    constructor(props){
        super(props)
        let newForm = {
            name: this.createObjectForState("input", "text", "Your Name", "", "name"),
            street: this.createObjectForState("input", "text", "Your Street", "", "street"),
            zipCode: this.createObjectForState("input", "text", "Your ZipCode", "", "zipCode"),
            country: this.createObjectForState("input", "text", "Your Country", "", "country"),
            email: this.createObjectForState("input", "email", "Your Email", "", "email"),
            deliveryMethod: this.createObjectForState("select", 
                                                        [
                                                            {value: "fastest", display: "Fastest"}, 
                                                            {value: "cheapest", display: "Cheapest"}
                                                        ], 
                                                        "-- Delivery Method --", 
                                                        "", "deliveryMethod")
        };
        this.state = {form: newForm, loading: false}
    }
    createObjectForState = (typeOfElement, configType, placeholderForConfig, valueForElement, identifier) => {
        return <Input 
            key = {identifier}
            elementtype = {typeOfElement}
            value = {valueForElement}
            type = {configType}
            placeholder = {placeholderForConfig}
            onChange = {(event) => this.onInputChangedHandler(event, identifier)}
            name = {identifier}
        />;
    }

    onInputChangedHandler = (event, identifier) =>{
        let newProps = {...this.state.form[identifier].props};
        newProps = this.createObjectForState(newProps.elementtype, newProps.type, newProps.placeholder, event.target.value, identifier);
        let newFormState = {...this.state.form};
        newFormState[identifier] = newProps;
        this.setState({form: newFormState})
    }

    submitFormHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true})
        console.log(this.props.burgerIngredients)
        const order = {
            ingredients: Object.keys(this.props.burgerIngredients).reduce((newObj, currVal) => 
                {
                    return {...newObj, [currVal]: this.props.burgerIngredients[currVal][0]}
                }, {}),
            price: this.props.totalPrice,
        }
        axios.post("/orders.json", order).then(response => {
            this.setState({loading: false, showModal: false});
            alert("Done");
            this.props.history.push("/");
        })
        .catch(error => {
            console.log(error)
            this.setState({loading: false, showModal: false});
        })
    }

    render(){
        return (
            <div className = {classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                <form>
                {this.state.form ? Object.keys(this.state.form).map( value => this.state.form[value]) : <Spinner />}
                <Button btnType = "Success" clicked={this.submitFormHandler}>ORDER</Button>
                </form>
            </div>
        );
    }
}

export default withRouter(ContactData);