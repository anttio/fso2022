import axios from 'axios';
import { useEffect, useState } from 'react';

const Weather = ({ city }) => {
  const [weather, setWeather] = useState([]);
  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHERSTACK_API_ACCESS_KEY}&query=${city}`
      )
      .then((response) => setWeather(response.data.current));
  }, [city]);

  return (
    <div>
      <h2>Weather in {city}</h2>
      <p>temperature {weather.temperature} Celcius</p>
      <p>
        <img
          src={weather.weather_icons[0]}
          alt={weather.weather_descriptions[0]}
        />
      </p>
      <p>wind {weather.wind_speed} km/h</p>
    </div>
  );
};

export default Weather;
