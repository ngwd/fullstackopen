import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react'
import Notification from './components/Notification'
import CountryList from './components/CountryList'

const App = ()=>{
  const [newSearch, setNewSearch] = useState('');
  const [countries, setCountries] = useState([]);
  const [countryList, setCountryList] = useState(null);
  const updateCountryList=(f)=>setCountryList(f);
  const hook = ()=>{
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response=>{
      setCountries(response.data);
    })
  };
  useEffect(hook, []);

  const handleNewSearch = (event)=> {
    const needle = event.target.value;
    const newCountryList = countries.filter(country=>
      country.name.common.toLowerCase().indexOf(needle) > -1
    );
    setNewSearch(needle);
    setCountryList(newCountryList);
  }

  return (
    <div>
      <form>
        <div>
          find countries <input value={newSearch} onChange={handleNewSearch}/>
        </div>
        <Notification countryList = {countryList} /> 
        <CountryList countryList = {countryList} updateCountryList={updateCountryList} />
      </form>
    </div>
  )
}

export default App
