import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems'
import Menu from '../../../components/Menu/Menu';

const toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <Menu clicked={props.clicked}/>
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav className={classes.DesktopOnly}>
                <NavigationItems></NavigationItems>
            </nav>

        </header>
    )
};

export default toolbar;