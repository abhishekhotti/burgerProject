import React, { Component } from 'react';
import Aux from "../../hoc/Aux";
import classes from "./Layout.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import {connect} from "react-redux";

class Layout extends Component{
    state = {
        showSideDrawer: false
    }

    changeSideDrawerHandler = () => {
        const currState = this.state.showSideDrawer;
        this.setState({showSideDrawer: !currState});
    }

    render() {
        return (
            <Aux>
                <div>
                    <Toolbar isAuth = {this.props.isAuth} open = {this.changeSideDrawerHandler} />
                    <SideDrawer isAuth = {this.props.isAuth} modalDisplay = {this.state.showSideDrawer} closed = {this.changeSideDrawerHandler}/>
                </div>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}
            
const mapStateToProps = state => {
    return {
        isAuth: state.authReducer.token !== null
    }
}

export default connect(mapStateToProps)(Layout);