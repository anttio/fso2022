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

  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const handleSearch = (event) => {
    let searchValue = event.target.value;
    setSearchValue(searchValue);
    setSearchResults(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  };

  return (
    <div>
      find countries <input onChange={handleSearch} value={searchValue} />
      <Countries countries={searchResults} filter={searchValue} />
    </div>
  );
};

export default App;
