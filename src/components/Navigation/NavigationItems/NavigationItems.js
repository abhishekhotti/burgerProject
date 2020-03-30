import React from 'react';
import classes from './NavigationItems.css'
import NavigationItem from "./NavigationItem/NavigationItem"
import {withRouter} from 'react-router-dom';

const navigationItems = (props) =>{
    return (
        <ul className = {classes.NavigationItems}>
            <NavigationItem link = "/">Burger Builder</NavigationItem>
            {props.isAuth? <NavigationItem link = "/Orders">Orders</NavigationItem> : null}
            {!props.isAuth ? 
                <NavigationItem link = "/Auth">Login</NavigationItem> : <NavigationItem link = "/Logout">Logout</NavigationItem>
            }
        </ul>
    );
}

export default withRouter(navigationItems);