import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import Notification from './components/Notification';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notificationMessage, setNotificationMessage] = useState({});

  // Fetch persons data
  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    // Check if person is already added
    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        updatePerson(existingPerson);
      }
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
      handleNotificationMessage({
        message: `Added ${returnedPerson.name}`,
        type: 'success',
      });
    });
  };

  const updatePerson = (updatePerson) => {
    personService
      .update({ ...updatePerson, number: newNumber })
      .then((returnedPerson) => {
        setPersons(
          persons.map((person) =>
            person.id !== updatePerson.id ? person : returnedPerson
          )
        );
        handleNotificationMessage({
          message: `Updated ${returnedPerson.name}`,
          type: 'success',
        });
      })
      .catch(() => {
        handleNotificationMessage({
          message: `Information of ${updatePerson.name} has already been removed from server`,
          type: 'error',
        });
        setPersons(persons.filter((person) => person.id !== updatePerson.id));
      });
  };

  const removePerson = (removePerson) => {
    if (window.confirm(`Delete ${removePerson.name}?`)) {
      personService.remove(removePerson).then(() => {
        setPersons(persons.filter((person) => person.id !== removePerson.id));
        handleNotificationMessage({
          message: `Deleted ${removePerson.name}`,
          type: 'success',
        });
      });
    }
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

  const handleNotificationMessage = ({ message, type }) => {
    if (message === null) {
      return false;
    }
    setNotificationMessage({ message, type });
    setTimeout(() => {
      setNotificationMessage('');
    }, 5000);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={notificationMessage.message}
        type={notificationMessage.type}
      />
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
        removePerson={removePerson}
      />
    </div>
  );
};

export default App;
