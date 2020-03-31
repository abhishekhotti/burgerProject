import React, {Component} from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios";
import Spinner from "../../components/UI/Spinner/Spinner";
import {connect} from "react-redux";


class Orders extends Component{
    state = {
        orders: null
    }

    componentDidMount(){
        let allOrders = null;
        const queryParam = "?auth="+this.props.token+"&orderBy=\"userId\"&equalTo=\""+this.props.userId+"\"";
        axios.get("/orders.json"+queryParam).then(response => {
            allOrders = Object.keys(response.data).map(value => {
                let priceForOrder = response.data[value].price;
                let objectIngredients = Object.keys(response.data[value].ingredients).reduce((totalOrder, item) => {
                    if(+response.data[value].ingredients[item] !== 0)
                    {
                        return totalOrder + item + " (" + response.data[value].ingredients[item]+") "
                    }
                    return totalOrder;
                }, "");
                return <Order key = {value} priceForOrder = {priceForOrder}>{objectIngredients}</Order>
            })
            this.setState({orders: allOrders})
        }).catch(err => {
            console.log(err)
        });
        if (allOrders === null)
        {
            this.setState({orders: "No Orders were found"})
        }
        else{
            this.setState({orders: allOrders})
        }
    }

    render(){
        let ordersToDisplay = <Spinner />
        if(this.state.orders){
            ordersToDisplay = this.state.orders
        }
        return (
            <div>
                {ordersToDisplay}
                {/* <Order />
                <Order /> */}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.authReducer.token,
        userId: state.authReducer.userId
    }
}

export default connect(mapStateToProps)(Orders);