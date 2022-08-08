const Persons = ({ persons, removePerson }) => {
  return persons.map((person) => (
    <p key={person.name}>
      {person.name} {person.number}{' '}
      <button onClick={() => removePerson(person)}>delete</button>
    </p>
  ));
};

export default Persons;
