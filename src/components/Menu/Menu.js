import React from 'react';
import classes from './Menu.module.css';

const menu = (props) => {
    const test = () => {
        console.log('test');
        props.clicked();
    }
    return (
        <div className={classes.Menu} onClick={test}>
            <div />
            <div />
            <div />
        </div>
    )
}

export default menu;