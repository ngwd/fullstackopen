const Filter = ({updateFilter}) => {
  const handleFilterChange = (event)=>{ 
    const s = event.target.value.toLowerCase();
    updateFilter(s); 
  };

  return (
    <div>
      filter shown with <input onChange={handleFilterChange}/>
    </div>
  );
}
export default Filter