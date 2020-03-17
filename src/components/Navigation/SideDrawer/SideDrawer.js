import React from 'react';
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "../SideDrawer/SideDrawer.css";
import Aux from "../../../hoc/Aux";
import BackDrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = props => {
    let attachClasses = [classes.SideDrawer, classes.Close];
    if(props.modalDisplay){
        attachClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <Aux>
            <BackDrop show={props.modalDisplay} hideModal={props.closed} />
            <div className = {attachClasses.join(' ')}>
                <div className = {classes.Logo}>
                    <Logo />
                </div>
                <nav className={classes.DesktopOnly}>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    )
}

export default sideDrawer;