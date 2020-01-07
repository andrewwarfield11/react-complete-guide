import React, { Component } from 'react';
import Aux from '../../hoc/Aux'
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import Sidedrawer from '../Navigation/Sidedrawer/Sidedrawer'

class Layout extends Component {

    state = {
        showSidedrawer: false,
    }

    sidedrawerToggledHandler = () => {
        this.setState((prevState) => (
            {showSidedrawer: !prevState.showSidedrawer}));
    }

    render() {
        return(
            <Aux>
            <Toolbar clicked={this.sidedrawerToggledHandler}/>
            <Sidedrawer open={this.state.showSidedrawer} toggled={this.sidedrawerToggledHandler}/>
            <main className={classes.Content}> {this.props.children} </main>
            </Aux>
        );
    }
}

export default Layout;