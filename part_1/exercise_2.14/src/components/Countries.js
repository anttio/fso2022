import Country from './Country';

const Countries = ({ countries, filter, showDetails }) => {
  // If more than 10 countries
  if (countries.length >= 10 && filter) {
    return <p>Too many matches, specify another filter</p>;
  }

  // If only 1 country then show details
  if (countries.length === 1 && filter) {
    return <Country country={countries[0]} />;
  }

  // Otherwise show list of under 10 countries
  if (filter) {
    return (
      <div>
        {countries.map((country) => (
          <p key={country.name.official}>
            {country.name.common}{' '}
            <button
              onClick={() => {
                showDetails(country);
              }}
            >
              show
            </button>
          </p>
        ))}
      </div>
    );
  }
};

export default Countries;
