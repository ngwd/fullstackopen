import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNameChange = (event)=>{
    setNewName(event.target.value);
  };
  const addNewName=(event)=>{
    event.preventDefault(); 
    setPersons(persons.concat({name:newName}));
  };
  const phoneItems = persons.map(
    (person)=><p key={person.name}>{person.name}</p> 
  );
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
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