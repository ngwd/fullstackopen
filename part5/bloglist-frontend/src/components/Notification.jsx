const Notification = ({error}) => {
  if (error===null) {
    console.log('error ', error)
    return null
  }
  else {
    const name = error.code===0 ? 'notification' : 'error'
    return (
      <div className={name}>
        {error.message}
      </div>
    )
  } 
}
export default Notification 