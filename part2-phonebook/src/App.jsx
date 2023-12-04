import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Phonebook from './services/Phonebook'

const App = () => {
  
  const [persons, setPersons] = useState([]);
  const updatePersons=(p)=>{
    // console.log("updatePersons ", p);
    setPersons(p);
  }
  const [newFilter, setNewFilter] = useState('');
  const updateFilter=(f)=>setNewFilter(f);

  const hook = ()=>{
    Phonebook.getAll()
    .then(data=>{
      setPersons(data);
    })
    .catch(error=>{
      console.error(error);
    });
  };

  useEffect(hook, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newfilter={newFilter} updateFilter={updateFilter}/>
      <h3>add a new</h3>
      <PersonForm persons={persons} updatePersons={updatePersons}/>
      <h3>Numbers</h3>
      <Persons persons={persons} updatePersons={updatePersons} criteria={newFilter}/>
    </div>
  )
}

export default App