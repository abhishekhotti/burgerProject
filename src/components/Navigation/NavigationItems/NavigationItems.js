import React from 'react';
import classes from './NavigationItems.css'
import NavigationItem from "./NavigationItem/NavigationItem"
import {withRouter} from 'react-router-dom';

const navigationItems = () =>{
    return (
        <ul className = {classes.NavigationItems}>
            <NavigationItem link = "/">Burger Builder</NavigationItem>
            <NavigationItem link = "/Orders">Orders</NavigationItem>
        </ul>
    );
}

export default withRouter(navigationItems);