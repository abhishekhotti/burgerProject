import React, { Component } from 'react';
import Aux from "../../hoc/Aux";
import classes from "./Layout.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

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
                    <Toolbar open = {this.changeSideDrawerHandler} />
                    <SideDrawer modalDisplay = {this.state.showSideDrawer} closed = {this.changeSideDrawerHandler}/>
                </div>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}
            

export default Layout;