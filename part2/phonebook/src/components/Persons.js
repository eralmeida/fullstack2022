import React from 'react';

const Persons = ({ personsToShow, deleteHandler }) => {
  return (
    <ul>
      {personsToShow.map((person) => (
        <li key={person.id} style={{ listStyleType: 'none' }}>
          {person.name} {person.number} <button onClick={() => deleteHandler(person)}>delete</button>
        </li>
      ))}
    </ul>
  );
};

export default Persons;
