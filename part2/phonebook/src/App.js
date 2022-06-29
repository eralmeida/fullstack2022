import { useState, useEffect } from 'react';
import Filter from './components/filter';
import PersonForm from './components/personForm';
import Persons from './components/Persons';
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('new name');
  const [newNumber, setNewNumber] = useState('00 - 00 - 000000');
  const [nameToSearch, setNameToSearch] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    if (persons.some((p) => p.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
    };

    setPersons(persons.concat(personObject));
    setNewName('');
    setNewNumber('');
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleNameSearch = (event) => {
    setNameToSearch(event.target.value);
  };

  const personsToShow = nameToSearch === '' ? persons : persons.filter((p) => p.name.toLocaleLowerCase().includes(nameToSearch.toLocaleLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter searchTerm={nameToSearch} handler={handleNameSearch}></Filter>

      <h4>Add new Person</h4>

      <PersonForm addPerson={addPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber}></PersonForm>

      <h2>Numbers</h2>

      <Persons personsToShow={personsToShow}></Persons>
    </div>
  );
};

export default App;
