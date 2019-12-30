import React, { Component } from 'react';
import Radium from 'radium'
import './App.css';
import Persons from '../components/Persons/Persons.js'
import Cockpit from '../components/Cockpit/Cockpit'

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
      showPersons: false
    }
  }


  static getDerivedStateFromProps(props,state) {
    console.log('App.js getdervivedstatefromprops ', props);
    return state;
  }

  componentDidMount() {
    console.log('App.js componendidmount');
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

    this.setState( {persons: persons} );
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
            changed={this.nameChangedHandler}></Persons>
      );
      }

    return (
      <div className="App">
        <Cockpit showPersons={this.state.showPersons}
        title={this.props.appTitle}
        persons={this.state.persons} 
        clicked={this.togglePersonsHandler}/>
        {persons}
      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default Radium(App);
