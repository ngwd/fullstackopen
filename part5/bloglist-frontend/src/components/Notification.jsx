const Notification = ({ error, handleErrorChange}) => {
  if (error===null) {
    return null
  }
  else {
    setTimeout(() => {
      handleErrorChange(null)
    }, 4000)
    const name = error.code===0 ? 'notification' : 'error'
    return (
      <div className={name} id='notification-label'>
        {error.message}
      </div>
    )
  }
}
export default Notification