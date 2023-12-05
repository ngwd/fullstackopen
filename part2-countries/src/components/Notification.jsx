const Notification = ({countryList}) => {
  const result = countryList??[];
  const length = result.length; 
  if (length > 10) {
    return <p>Too many matches, specify another filter</p>
  }
  else { 
    // if (1 < length && length <= 10) {
    return null;
  }
}
export default Notification
