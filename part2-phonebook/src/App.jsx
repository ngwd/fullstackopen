import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Phonebook from './services/Phonebook'
import Notification from './components/Notification'

const App = () => {
  
  const [persons, setPersons] = useState([]);
  const updatePersons=(p)=>{
    // console.log("updatePersons ", p);
    setPersons(p);
  }
  const [newFilter, setNewFilter] = useState('');
  const updateFilter=(f)=>setNewFilter(f);

  const [errorMessage, setErrorMessage] = useState('');
  const updateErrorMessage =(f)=>setErrorMessage(f);

  const [errorCode, setErrorCode] = useState(0);
  const updateErrorCode =(f)=>setErrorCode(f);

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
      <Notification message={errorMessage} code={errorCode}/>
      <Filter newfilter={newFilter} updateFilter={updateFilter}/>
      <h3>add a new</h3>
      <PersonForm persons={persons} updatePersons={updatePersons} updateErrorCode={updateErrorCode} updateErrorMessage={updateErrorMessage}/>
      <h3>Numbers</h3>
      <Persons persons={persons} updatePersons={updatePersons} criteria={newFilter}/>
    </div>
  )
}

export default App