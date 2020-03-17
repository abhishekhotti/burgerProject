import React from "react";
import classes from "../ToggleDrawer/ToggleDrawer.css"

const toggleDrawer = props =>{
    return (
        <div className={classes.DrawerToggle} onClick = {props.open} >
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}

export default toggleDrawer;