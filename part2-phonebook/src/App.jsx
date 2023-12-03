import { useState } from 'react'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');

  const handleNameChange = (event)=>{ setNewName(event.target.value); };
  const handleNewNumberChange = (event)=>{ setNewNumber(event.target.value); };

  const handleFilterChange = (event)=>{ 
    const s = event.target.value.toLowerCase();
    setNewFilter(s); 
    // console.log(`event.target.value ${s}, newFilter ${newFilter}`);
  };

  const nameExists = (name) => {
    let p = persons.filter(person=>person.name===name);
    return p.length>0;
  };

  const addNewPerson = (event)=>{
    event.preventDefault(); 
    if (nameExists(newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat({name:newName, number:newNumber}));
      setNewName('');
      setNewNumber('');
    }
  };
  // const phoneItems = filteredPersons.map( (person)=><p key={person.name}>{person.name} {person.number}</p> );
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={newFilter} onChange={handleFilterChange}/>
      </div>
      <h3>add a new</h3>
      <form onSubmit={addNewPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number:<input value={newNumber} onChange={handleNewNumberChange}/>
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h3>Numbers</h3>
      <Persons persons={persons} criteria={newFilter}/>
    </div>
  )
}

export default App