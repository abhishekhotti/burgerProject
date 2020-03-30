import React from 'react';
import classes from "./Toolbar.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import ToggleDrawer from "../SideDrawer/ToggleDrawer/ToggleDrawer";

const toolbar = props => {
    return (
        <header className={classes.Toolbar}>
            <ToggleDrawer open = {props.open} />
            <div className = {classes.Logo}>
                <Logo />
            </div>
            <nav className={classes.DesktopOnly}>
                <NavigationItems isAuth = {props.isAuth} />
            </nav>
        </header>
    )
}

export default toolbar;