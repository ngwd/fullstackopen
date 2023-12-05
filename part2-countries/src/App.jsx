import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react'
import Notification from './components/Notification'
import SearchResult from './components/SearchResult'

const App = ()=>{
  const [newSearch, setNewSearch] = useState('');
  const [countries, setCountries] = useState([]);
  const [searchResult, setSearchResult] = useState(null);

  const hook = ()=>{
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response=>{
      setCountries(response.data);
    })
  };
  useEffect(hook, []);

  const handleNewSearch = (event)=> {
    const needle = event.target.value;
    const newSearchResult = countries.filter(country=>
      country.name.common.toLowerCase().indexOf(needle) > -1
    );
    setNewSearch(needle);
    setSearchResult(newSearchResult);
  }

  return (
    <div>
      <form>
        <div>
          find countries <input value={newSearch} onChange={handleNewSearch}/>
        </div>
        <Notification searchResult = {searchResult} /> 
        <SearchResult searchResult = {searchResult} />
      </form>
    </div>
  )
}

export default App
