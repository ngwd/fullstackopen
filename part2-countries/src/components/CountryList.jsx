import Weather from "./Weather";
const CountryList = ({countryList, updateCountryList}) => {
  const result = countryList??[]; 
  const length = result.length;
  const selectCountry= (country)=> {
    updateCountryList([country]);
  } 
  if (length> 10) {
    return null
  }
  else if (1 < length && length <= 10) {
    const countryNames = result.map(country =>(
      <p key={country.name.common}>{country.name.common}
        <button onClick={()=>selectCountry(country)}>show</button>
      </p>
    ));
    return (<>
      {countryNames}
    </>);
  }
  else if (1 === length) { // ==1
    const country = result[0];
    const languages= Object.values(country.languages).map(lname =>( 
     <li key={lname}>{lname}</li> 
    ));
    return (
      <>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area} </p>
      <p/>
      <h3>Languages</h3>
      <ul>
        {languages}
      </ul>
      <img src={country.flags.svg} className="logo" />
      <Weather city={country.capital[0]} countryCode={country.cca2}/>
      </>
    );
  }
  else return null;
}
export default CountryList