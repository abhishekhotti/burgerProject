import React, { Component } from 'react';
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios";
import Spinner from "../../../components/UI/Spinner/Spinner";
import {withRouter} from "react-router-dom";

class ContactData extends Component{
    state = {
        name: '',
        email: '',
        address :{
            street:'',
            postalCode: ''
        },
        loading: false,
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
            customer: {
                name: "Abhi",
                address: {
                    street: "Great Masll",
                    zipCode: "13834",
                    country: "Germany"
                },
                email: "abhi@abhic.om"
            },
            deliveryMethod: "fastest"
        }
        axios.post("/orders.json", order).then(response => {
            this.setState({loading: false, showModal: false});
            alert("Done");
            // console.log(this.props)
            this.props.history.push("/");
        })
        .catch(error => {
            console.log(error)
            this.setState({loading: false, showModal: false});
        })
    }

    render(){
        let form = (
            <form>
                <input className = {classes.Input} type="text" name="name" placeholder="Your Name" />
                <input className = {classes.Input} type="text" name="email" placeholder="Your Email" />
                <input className = {classes.Input} type="text" name="street" placeholder="Street" />
                <input className = {classes.Input} type="text" name="postal" placeholder="Your Postal Code" />
                <Button btnType = "Success" clicked={this.submitFormHandler}>ORDER</Button>
            </form>
        )
        if (this.state.loading){
            form = <Spinner />
        }
        return (
            <div className = {classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default withRouter(ContactData);