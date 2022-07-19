import { useState, useEffect } from 'react';
import Filter from './components/filter';
import PersonForm from './components/personForm';
import Persons from './components/Persons';
import personService from './services/personService';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('new name');
  const [newNumber, setNewNumber] = useState('00 - 00 - 000000');
  const [nameToSearch, setNameToSearch] = useState('');
  const [addedNameMessage, setAddedNameMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const Notification = ({ message }) => {
    if (message === null) {
      return null;
    }
    return <div className="addedNameMessage">{message}</div>;
  };

  const ErrorMessage = ({ message }) => {
    if (message === null) {
      return null;
    }
    return <div className="errorMessage">{message}</div>;
  };

  const addPerson = (event) => {
    event.preventDefault();

    if (persons.some((p) => p.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find((p) => p.name === newName);
        const changedPerson = { ...person, number: newNumber };
        personService
          .update(changedPerson.id, changedPerson)
          .then((updatedPerson) => {
            setPersons(persons.map((person) => (person.id !== changedPerson.id ? person : updatedPerson)));
            setAddedNameMessage(`${changedPerson.name}'s number has changed to ${updatedPerson.number}`);
          })
          .catch(() => {
            setErrorMessage(`Information of ${changedPerson.name} has already been removed from server`);
          });
      } else {
        return;
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };

      personService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setAddedNameMessage(`Added ${personObject.name}`);
        setNewName('');
        setNewNumber('');
      });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleNameSearch = (event) => {
    setNameToSearch(event.target.value);
  };

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.deletePerson(person.id);
      setPersons(persons.filter((p) => p.id !== person.id));
    }
  };

  const personsToShow = nameToSearch === '' ? persons : persons.filter((p) => p.name.toLocaleLowerCase().includes(nameToSearch.toLocaleLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={addedNameMessage}></Notification>
      <ErrorMessage message={errorMessage}></ErrorMessage>
      <Filter searchTerm={nameToSearch} handler={handleNameSearch}></Filter>

      <h4>Add new Person</h4>

      <PersonForm addPerson={addPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber}></PersonForm>

      <h2>Numbers</h2>

      <Persons personsToShow={personsToShow} deleteHandler={deletePerson}></Persons>
    </div>
  );
};

export default App;
