import React from 'react';

const Persons = ({ personsToShow }) => {
  return (
    <ul>
      {personsToShow.map((person) => (
        <li key={person.name} style={{ listStyleType: 'none' }}>
          {person.name} {person.number}
        </li>
      ))}
    </ul>
  );
};

export default Persons;
