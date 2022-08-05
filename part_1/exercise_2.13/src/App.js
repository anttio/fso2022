import axios from 'axios';
import { useEffect, useState } from 'react';
import Countries from './components/Countries';

const App = () => {
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => setCountries(response.data));
  }, []);
  const [filteredCountries, setFilteredCountries] = useState([]);

  const [searchValue, setSearchValue] = useState('');
  const handleSearch = (event) => {
    let searchValue = event.target.value;
    setSearchValue(searchValue);
    setFilteredCountries(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  };

  // Show country details from child component
  const showCountryDetails = (country) => {
    setFilteredCountries([country]);
  };

  return (
    <div>
      find countries <input onChange={handleSearch} value={searchValue} />
      <Countries
        countries={filteredCountries}
        filter={searchValue}
        showDetails={showCountryDetails}
      />
    </div>
  );
};

export default App;
