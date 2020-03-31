import React, { Component } from 'react';
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import {withRouter} from "react-router-dom";
import Input from "../../../components/UI/Input/Input";
import {connect} from 'react-redux';
import * as actions from "../../../store/actions/index";

class ContactData extends Component{
    constructor(props){
        super(props)
        let newForm = {
            name: {inputObject: this.createObjectForState("input", "text", "Name", "", "name", false, false), required: {valid: false}},
            street: {inputObject:this.createObjectForState("input", "text", "Street", "", "street", false, false), required: {valid: false}},
            zipCode: {inputObject:this.createObjectForState("input", "text", "ZipCode (5 digits)", "", "zipCode", false, false), required: {valid: false, minLength: 5}},
            country: {inputObject:this.createObjectForState("input", "text", "Country", "", "country", false, false), required: {valid: false}},
            email: {inputObject:this.createObjectForState("input", "email", "Email", "", "email", false, false), required: {valid: false}},
            deliveryMethod: {inputObject:this.createObjectForState("select", 
                                                        [
                                                            {value: "fastest", display: "Fastest"}, 
                                                            {value: "cheapest", display: "Cheapest"}
                                                        ], 
                                                        "-- Delivery Method --", 
                                                        "fastest", "deliveryMethod", false, false), required:{valid: true}}
        };
        this.state = {form: newForm, loading: false, wholeForm: false}
    }
    createObjectForState = (typeOfElement, configType, placeholderForConfig, valueForElement, identifier, validity, touched) => {
        return <Input 
            key = {identifier}
            elementtype = {typeOfElement}
            value = {valueForElement}
            type = {configType}
            placeholder = {placeholderForConfig}
            onChange = {(event) => this.onInputChangedHandler(event, identifier)}
            name = {identifier}
            touched = {touched.toString()}
            validity = {validity.toString()}
        />;
    }

    onInputChangedHandler = (event, identifier) =>{
        let newProps = {...this.state.form[identifier]};
        if (event.target.value.length === this.state.form[identifier].required.minLength){
            newProps.required.valid = true
        }
        else if (!this.state.form[identifier].required.minLength && event.target.value.trim().length > 0){
            newProps.required.valid = true
        }
        else{
            newProps.required.valid = false
        }
        newProps.inputObject = this.createObjectForState(
                                    newProps.inputObject.props.elementtype, 
                                    newProps.inputObject.props.type, 
                                    newProps.inputObject.props.placeholder, 
                                    event.target.value, 
                                    identifier, 
                                    newProps.required.valid.toString(), true);
        let newFormState = {...this.state.form};
        newFormState[identifier] = newProps;
        this.setState({form: newFormState})
    }

    submitFormHandler = (event) => {
        event.preventDefault();
        const contactInfo = Object.keys(this.state.form).reduce((combinedDict ,item) => {

            return {...combinedDict, [item]: this.state.form[item].inputObject.props.value}
        }, {});
        const order = {
            ingredients: Object.keys(this.props.ingredientsFromStore).reduce((newObj, currVal) => 
                {
                    return {...newObj, [currVal]: this.props.ingredientsFromStore[currVal][0]}
                }, {}),
            price: this.props.priceFromStore,
            contactInfo: contactInfo,
            userId: this.props.userId
        }
        this.props.onOrderBurger(order, this.props.token)
        // axios.post("/orders.json", order).then(response => {
        //     this.setState({loading: false, showModal: false});
        //     alert("Done");
        //     this.props.history.push("/");
        // })
        // .catch(error => {
        //     console.log(error)
        //     this.setState({loading: false, showModal: false});
        // })
    }

    render(){
        let checkFormState = true;
        for(let item in this.state.form){
            if(!this.state.form[item].required.valid && checkFormState)
                checkFormState = this.state.form[item].required.valid
        }
        return (
            <div className = {classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                <form onSubmit = {this.submitFormHandler}>
                {this.state.form ? Object.keys(this.state.form).map( value => this.state.form[value].inputObject) : <Spinner />}
                <Button activate = {!checkFormState} btnType = "Success" >ORDER</Button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredientsFromStore: state.burgerBuilder.ingredients,
        priceFromStore: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.authReducer.token,
        userId: state.authReducer.userId
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ContactData));