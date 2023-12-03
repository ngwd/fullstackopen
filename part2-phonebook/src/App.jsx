import { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const updatePersons=(p)=>setPersons(p);

  const [newFilter, setNewFilter] = useState('');
  const handleFilterChange = (event)=>{ 
    const s = event.target.value.toLowerCase();
    setNewFilter(s); 
    // console.log(`event.target.value ${s}, newFilter ${newFilter}`);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={newFilter} onChange={handleFilterChange}/>
      </div>
      <h3>add a new</h3>
      <PersonForm persons={persons} updatePersons={updatePersons}/>
      <h3>Numbers</h3>
      <Persons persons={persons} criteria={newFilter}/>
    </div>
  )
}

export default App