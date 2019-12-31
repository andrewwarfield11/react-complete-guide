import React, { PureComponent } from 'react'
import Person from './Person/Person.js'

class Persons extends PureComponent {
    /*static getDerivedStateFromProps(props,state) {
        console.log('Persons.js getDerviedStateFromProps');
        return state;
    }*/
    /*shouldComponentUpdate(nextProps, nextState) {
        console.log('Persons.js shouldComponentUpdate')
        // no need to rerender if persons prop doesn't change
        if (nextProps.persons !== this.props.persons || nextProps.changed !== this.props.changed || nextProps.clicked !== this.props.clicked) {
            return true;
        }
        else {
            return false;
        }
    }*/

    componentWillUnmount() {
        console.log('Person.js componentWillUnmount');
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('Persons.js getSnapshotBeforeUpdate');
        return { message: "snapshot!"}
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('Persons.js componentDidUpdate');
        console.log(snapshot);
    }
    render() {
        console.log('Persons.js rendering');
            return this.props.persons.map((person,index) => {
                return (
                <Person
                    click={() => this.props.clicked(index)}
                    name={person.name} 
                    age={person.age}
                    key={person.id}
                    changed={(event) => this.props.changed(event, person.id)}
                    isAuth={this.props.isAuthenticated}
                /> 
        );
    });
}
}


export default Persons;