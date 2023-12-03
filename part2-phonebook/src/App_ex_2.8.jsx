import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number:'39-44-12345'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  // const [newPerson, setNewPerson] = useState({name:'', number:''})

  const handleNameChange = (event)=>{
    setNewName(event.target.value);
  };

  const handleNewNumberChange = (event)=>{
    setNewNumber(event.target.value);
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
  const phoneItems = persons.map(
    (person)=><p key={person.name}>{person.name} {person.number}</p> 
  );
  return (
    <div>
      <h2>Phonebook</h2>
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
      <h2>Numbers</h2>
      {phoneItems}
    </div>
  )
}

export default App