import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';
import ValidationComponent from './ValidationComponent/ValidationComponent.js'
import CharComponent from './CharComponent/CharComponent.js';


/*
  ASSIGNMENT 2
  1. Create an input field (in App component) with a change listener which outputs the length of the entered text
  2. Create a new component (ValidationComponent) which recieves the text length as a prop
  3. Inside the ValidationComponent, either output "text too short" or "text long enough" depending on whether it's 
    more or less than 5
  4. Create another component (=>CharComponent) and style it as an inline box (=> specific css, look on screen for it) 
  5. Render a list of CharComponents where each one receives a different letter of the entered text in the initial
   input field as a prop
  6. When you click a CharComponent it should be removed from the entered text.
*/
class App extends Component {
  state = {
    persons: [
      { id: 'sdflsl', name: 'Andrew', age: 22 },
      { id: '3l3jlk', name: 'Bob', age: 20 },
      { id: 'lkfds9', name: 'Max', age: 29 }
    ],
    otherState: 'some other value',
    showPersons: false,
    input: ''
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

  deleteLetterHandler = (index) => {
    // remove from entered text
    let inp = this.state.input.split('');
    inp.splice(index,1);
    const text = inp.join('')
    this.setState( {input: text} );
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState( { showPersons: !doesShow } );
  }

  inputChangedHandler = (event) => {
    console.log(event.target.value)
    this.setState({input: event.target.value})
  }

  render () {
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    let persons = null;

    if ( this.state.showPersons ) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
              click={() => this.deletePersonHandler(index)}
              name={person.name} 
              age={person.age}
              key={person.id}
              changed={(event) => this.nameChangedHandler(event, person.id)} />
          })}
        </div>
      );
    }

    const charComponents = this.state.input.split('').map((char, index) => {
      return (
        <CharComponent
          letter={char}
          click={() => this.deleteLetterHandler(index)}
          key={index}></CharComponent>
      )
    })

    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p>This is really working!</p>
        <button
          style={style}
          onClick={this.togglePersonsHandler}>Toggle Persons</button>
        <p>Input</p>
        <input 
          type="text"
          onChange={(event) => this.inputChangedHandler(event)}
          value={this.state.input}></input>
        <p>{this.state.inputLen}</p>
        {persons}
        <ValidationComponent len={this.state.input.length}></ValidationComponent>
        {charComponents}
      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default App;
