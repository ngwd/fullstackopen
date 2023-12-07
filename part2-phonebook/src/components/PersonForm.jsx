import { useState } from 'react'
import Phonebook from '../services/Phonebook';
const PersonForm = ({persons, updatePersons, updateErrorCode, updateErrorMessage}) => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handleNameChange = (event)=>{ setNewName(event.target.value); };
  const handleNewNumberChange = (event)=>{ setNewNumber(event.target.value); };

  const checkPersonEnum = {
    only_name_exists:0,
    perfect_matched_exists:1,
    no_such_entry:2,
  };

  const checkPerson = (name, number) => {
    let personsSameName = persons.filter(person=>person.name===name);
    if (personsSameName.length > 0) {
      let personsSamePhone = personsSameName.filter(person=>person.number===number);
      if (personsSamePhone.length>0) {
        return [checkPersonEnum.perfect_match_exists, -1];
      }
      return [checkPersonEnum.only_name_exists, personsSameName[0].id];
    }
    return [checkPersonEnum.no_such_entry, -1];
  };

  const addNewPerson = (event)=>{
    event.preventDefault(); 
    const [checkResult, id] = checkPerson(newName, newNumber);

    const stateUpdate = (errorMessage, errorCode = 0) => {
      setNewName('');
      setNewNumber('');
      updateErrorCode(errorCode);
      updateErrorMessage(errorMessage);
      setTimeout(() => { 
        updateErrorMessage('') 
        updateErrorCode(0);
      }, 4000);
    };

    if (checkResult == checkPersonEnum.perfect_matched_exists) {
      alert(`${newName} is already added to phonebook`);
    }
    else if (checkResult == checkPersonEnum.only_name_exists) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`) === false) return;  
      let personWithNewNumber = {name:newName, number:newNumber, id};
      Phonebook.update(id, personWithNewNumber)
      .then( data => {
        updatePersons(persons.map(person => person.id===id ? data : person));
        stateUpdate(`Update the phone number of ${newName}`);
      })
      .catch( error => {
        if (error.response.status === 404) {
          updatePersons(persons.filter(person => person.id!==id));
          stateUpdate(`Information of '${newName}' has already been removed from server`, 404);
        }
      });
    }
    else {
      let newPerson = {name:newName, number:newNumber, id:persons.length+1};
      Phonebook.addOne(newPerson)
      .then( data => {
        updatePersons(persons.concat(data));
        stateUpdate(`Added ${newName}`);
      })
      .catch( error => {
        console.log(error);
        stateUpdate(error.response.data.error, 400)
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