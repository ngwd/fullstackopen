const Notification = ({message})=> {
  if(message === '') return null;
  return (
    <div class='error'>
      {message}
    </div>
  ) 
}
export default Notification