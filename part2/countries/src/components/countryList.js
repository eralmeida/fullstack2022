import React from 'react';

const CountryList = ({ countries, showCountryHandler }) => {
  return (
    <ul>
      {countries.map((country) => (
        <li key={country.name.common} style={{ listStyleType: 'none' }}>
          {country.name.common} <button onClick={(event) => showCountryHandler(country.name.common)}>show</button>
        </li>
      ))}
    </ul>
  );
};

export default CountryList;
