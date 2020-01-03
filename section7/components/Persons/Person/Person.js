import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Aux from '../../../hoc/Aux.js';
import withClass from '../../../hoc/withClass.js';
import classes from './Person.module.css';
import AuthContext from '../../../context/auth-context.js'

class Person extends Component {
    constructor(props) {
        super();
        this.inputElementRef = React.createRef();
    }

    static contextType = AuthContext;

    componentDidMount() {
        this.inputElementRef.current.focus();
        console.log(this.context.authenticated);
    }
    render() {
        return (
            <React.Fragment>
                {this.context.authenticated ? <p>Authenticated</p> : <p>Please log in</p>}
                <p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age}</p>
                <p>{this.props.children}</p>
                <input type="text" ref={this.inputElementRef} onChange={this.props.changed} value={this.props.name} />
            </React.Fragment>
                
        )
    }
}

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
};

export default withClass(Person,classes.Person);