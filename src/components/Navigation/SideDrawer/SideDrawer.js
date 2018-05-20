import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/BurguerAux/BurguerAux';
import classes from './SideDrawer.css';

const sideDrawer = (props) => {
    const sideDrawerClassState = props.open ? classes.Open : classes.Close;
    const sideDrawerClasses = [classes.SideDrawer, sideDrawerClassState].join(' ');
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={sideDrawerClasses}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;