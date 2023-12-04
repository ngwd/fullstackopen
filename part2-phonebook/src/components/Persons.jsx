const Persons = ({persons, criteria}) => {
  if(criteria==='') {
    return;
  }
  else {
    let filteredPersons = persons.filter(person=>person.name.toLowerCase().indexOf(criteria)>-1); 
    return filteredPersons.map(person=><p key={person.id}>{person.name} {person.number}</p>);
    /*
    return persons.filter(person=>person.name.toLowerCase().indexOf(criteria)>-1).
          map(person=><p key={person.name}>{person.name} {person.number}</p>);
    */
    // console.log("filtered persons get ", p.length);
  }
}
export default Persons