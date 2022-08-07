import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  // Fetch persons data
  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    // Check if person is already added
    const personIsAlreadyAdded = persons.find(
      (person) => person.name === newName
    );
    if (personIsAlreadyAdded) {
      alert(`${newName} is already added to phonebook`);
      return false;
    }

    // Create new person
    const person = {
      name: newName,
      number: newNumber,
    };

    // Add new person to database
    personService.create(person).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName('');
      setNewNumber('');
    });
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onChange={handleFilterChange} />

      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        name={newName}
        onNameChange={handleNameChange}
        number={newNumber}
        onNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons
        persons={persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        )}
      />
    </div>
  );
};

export default App;
