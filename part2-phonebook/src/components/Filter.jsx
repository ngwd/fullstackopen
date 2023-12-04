const Filter = ({newFilter, updateFilter}) => {
  const handleFilterChange = (event)=>{ 
    const s = event.target.value.toLowerCase();
    updateFilter(s); 
  };

  return (
    <div>
      filter shown with <input value={newFilter} onChange={handleFilterChange}/>
    </div>
  );
}
export default Filter