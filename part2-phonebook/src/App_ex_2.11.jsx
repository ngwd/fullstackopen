import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  
  const [persons, setPersons] = useState([]);
  const updatePersons=(p)=>setPersons(p);
  const [newFilter, setNewFilter] = useState('');
  const updateFilter=(f)=>setNewFilter(f);

  const hook = ()=>{
    axios.get("http://localhost:3001/persons")
    .then(response=>{
      setPersons(response.data);
    });
  };
  useEffect(hook, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter updateFilter={updateFilter}/>
      <h3>add a new</h3>
      <PersonForm persons={persons} updatePersons={updatePersons}/>
      <h3>Numbers</h3>
      <Persons persons={persons} criteria={newFilter}/>
    </div>
  )
}

export default App