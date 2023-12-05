const Notification = ({message, code})=> {
  if(message === '') return null;
  return (
    <div class={code==0?'notification':'error'}>
      {message}
    </div>
  ) 
}
export default Notification