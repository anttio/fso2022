import Weather from './Weather';

const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>

      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map((language) => {
          return <li key={language}>{language}</li>;
        })}
      </ul>

      <img src={country.flags.png} alt={country.name.common} width="100" />

      <Weather city={country.capital[0]} />
    </div>
  );
};

export default Country;
