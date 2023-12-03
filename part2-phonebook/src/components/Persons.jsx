const Persons = ({persons, criteria}) => {
  if(criteria==='') {
    return;
  }
  else {
    return persons.filter(person=>person.name.toLowerCase().indexOf(criteria)>-1).
          map(person=><p key={person.name}>{person.name} {person.number}</p>);
    // console.log("filtered persons get ", p.length);
  }
}
export default Persons