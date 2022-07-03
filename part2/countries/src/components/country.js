import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Country = ({ country }) => {
  const [temperature, setTemperature] = useState('');
  const [icon, setIcon] = useState('');
  const [wind, setWind] = useState('');

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
      )
      .then((response) => {
        const obj = response.data.list[0];
        console.log(obj);
        setTemperature(obj.main.temp);
        setIcon(obj.weather[0].icon);
        setWind(obj.wind.speed);
      });
  }, []);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>Capital {country.capital}</div>
      <div>Area {country.area}</div>
      <h4>Languages:</h4>
      <ul>
        {Object.values(country.languages).map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
      <div>
        <img src={country.flags.png} alt="img" style={{ width: '10%', marginLeft: '10px' }}></img>
      </div>
      <h4>Weather in {country.capital}</h4>
      <div>Temperature : {temperature} Celsius</div>
      <img src={`http://openweathermap.org/img/wn/${icon}.png`} alt="weather" style={{ width: '100px' }}></img>
      <div>Wind {wind} m/s</div>
    </div>
  );
};

export default Country;
