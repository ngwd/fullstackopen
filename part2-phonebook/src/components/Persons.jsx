import Phonebook from "../services/Phonebook";
const Persons = ({persons, updatePersons, criteria}) => {
  const deletionHandler = (person)=>{
    const {id, name} = person;
    if (window.confirm(`Delete ${name}?`)===false) return;
    Phonebook.remove(id)
    .then(()=>{
      const newPersons = persons.filter(person=>person.id!==id);
      updatePersons(newPersons);
    })
    .catch(error=>{
      console.error(error);
    });
  };

  if(criteria==='') {
    return;
  }
  else {
    let filteredPersons = persons.filter(person=>person.name.toLowerCase().indexOf(criteria)>-1); 
    return filteredPersons.map(person=>(
      <p key={person.id}>{person.name} {person.number} <button onClick={()=>deletionHandler(person)}>delete</button></p>));
  }
}
export default Persons