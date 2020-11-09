import React, {Component} from 'react';
import classes from './App.css';
import Person from './Person/Person';


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
        let btnClass = '';
        let persons = null;

        if (this.state.showPersons) {
            persons = (
                <div>
                    {this.state.persons.map((person, index) => {
                        return <Person
                            click={() => this.deletePersonHandler(index)}
                            name={person.name}
                            age={person.age}
                            key={person.id}
                            changed={(event) => this.nameChangeHandler(event, person.id)}/>
                    })}
                </div>
            )

            btnClass = classes.Red;

        }
        const assignedClasses = []

        if (this.state.persons.length <= 2) {
            assignedClasses.push(classes.red)
        }
        if (this.state.persons.length <= 1) {
            assignedClasses.push(classes.bold)
        }


        return (
            <div className={classes.App}>
                <h1>Hi, I'm a React App</h1>
                <p className={assignedClasses.join(' ')}>This is really working!</p>
                <button className={btnClass} onClick={this.togglePersonsHandler}>
                    Toggle Persons
                </button>
                {persons}
            </div>
        );
    }

}

export default App;
