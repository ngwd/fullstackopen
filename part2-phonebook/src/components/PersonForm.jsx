import { useState } from 'react'
import axios from 'axios';
const PersonForm = ({persons, updatePersons}) => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handleNameChange = (event)=>{ setNewName(event.target.value); };
  const handleNewNumberChange = (event)=>{ setNewNumber(event.target.value); };

  const nameExists = (name) => {
    let p = persons.filter(person=>person.name===name);
    return p.length>0;
  };

  const addNewPerson = (event)=>{
    event.preventDefault(); 
    if (nameExists(newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      let newPerson = {name:newName, number:newNumber, id:persons.length+1};
      axios.post('http://localhost:3001/persons', newPerson)
      .then( response =>{
        updatePersons(persons.concat(response.data));
        setNewName('');
        setNewNumber('');
      })
      .catch( error =>{
        console.log(error);
      });
    }
  };

  return (
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
  );
}
export default PersonForm