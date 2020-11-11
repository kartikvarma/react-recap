import React, {Component} from 'react';
import classes from './App.css';
import Persons from "../components/Persons/Persons";
import Cockpit from "../Cockpit/Cockpit";

class App extends Component {
    state = {
        persons: [
            {id: 1, name: 'Kartik', age: 32},
            {id: 2, name: 'Sobiya', age: 29},
            {id: 3, name: 'Varsha', age: 28}
        ],
        otherState: 'some other value',
        showPersons: false
    }

    switchNameHandler = (newName) => {
        this.setState({
            persons: [
                {name: newName, age: 32},
                {name: 'Sobiya', age: 29},
                {name: 'Varsha', age: 29}
            ]
        })
    }

    nameChangeHandler = (event, id) => {
        // find the person matching the id
        const personIndex = this.state.persons.findIndex(p => {
            return p.id === id;
        })

        // Get a copy of the person from the persons array with the personIndex
        const person = {
            ...this.state.persons[personIndex]
        }

        // Change the name of the copied person
        person.name = event.target.value;

        // create a copy of persons array
        const persons = [...this.state.persons]
        // set the person copy into the personIndex in the copied array
        persons[personIndex] = person
        this.setState({
            persons: persons
        })
    }

    togglePersonsHandler = () => {
        const doesShow = this.state.showPersons;
        this.setState({showPersons: !doesShow})
    }

    deletePersonHandler = (personIndex) => {
        const persons = this.state.persons.slice();
        persons.splice(personIndex, 1);
        this.setState({persons: persons})
    }

    render() {
        let persons = null;
        if (this.state.showPersons) {
            persons = (
                <div>
                    <Persons
                        persons={this.state.persons}
                        clicked={this.deletePersonHandler}
                        changed={this.nameChangeHandler}/>
                </div>
            )
        }

        return (
            <div className={classes.App}>
                <Cockpit
                    showPersons={this.state.showPersons}
                    persons={this.state.persons}
                    toggle={this.togglePersonsHandler}/>
                {persons}
            </div>
        );
    }
}

export default App;
