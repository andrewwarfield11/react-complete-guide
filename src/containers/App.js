import React, { Component } from 'react';
//import './App.css';
import Persons from '../components/Persons/Persons.js'
import Cockpit from '../components/Cockpit/Cockpit'
import withClass from '../hoc/withClass.js'
import classes from './App.module.css'
import Aux from '../hoc/Aux.js'
import AuthContext from '../context/auth-context.js'

class App extends Component {
  constructor(props) {
    super(props);
    console.log('App.js constructor');
    this.state = {
      persons: [
        { id: 'sdflsl', name: 'Andrew', age: 22 },
        { id: '3l3jlk', name: 'Bob', age: 20 },
        { id: 'lkfds9', name: 'Max', age: 29 }
      ],
      otherState: 'some other value',
      showPersons: false,
      showCockpit: true,
      changeCounter: 0,
      authenticated: false
    }
  }


  static getDerivedStateFromProps(props,state) {
    console.log('App.js getdervivedstatefromprops ', props);
    return state;
  }

  componentDidMount() {
    console.log('App.js componendidmount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('App.js shouldComponentUpdate');
    return true;
  }
  componentDidUpdate() {
    console.log('App.js componentDidUpdate');
  }

  loginHandler = () => {
    this.setState({authenticated: true});
  }

  nameChangedHandler = ( event, id ) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    // const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState( (prevState,props) => {
      return {
        persons: person,
        changeCounter: prevState.changeCounter + 1
      };
    } );
  }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState( { showPersons: !doesShow } );
  }

  render () {

    console.log('App.js render');
    let persons = null;

    if ( this.state.showPersons ) {
      persons = (
          <Persons
            persons={this.state.persons}
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler}
            isAuthenticated={this.state.authenticated}></Persons>
      );
      }

    return (
      <Aux>
        <button 
          onClick={() => {
            this.setState({showCockpit: !this.state.showCockpit});
          }}>Remove Cockpit</button>
          <AuthContext.Provider value={{authenticated: this.state.authenticated, login: this.loginHandler}}>
            {this.state.showCockpit ? 
            <Cockpit 
              showPersons={this.state.showPersons}
              personsLength={this.state.persons.length}
              title={this.props.appTitle}
              persons={this.state.persons} 
              clicked={this.togglePersonsHandler}
              login={this.loginHandler}/> : null }
          {persons}
          </AuthContext.Provider>
      </Aux> 
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default withClass(App,classes.App);
