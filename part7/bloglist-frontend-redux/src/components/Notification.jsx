import { useSelector } from 'react-redux'
const Notification = () => {
  const notification = useSelector(
    state => state.notificationReducer
  )
  if ( !notification ) return null
  else {
    const name = notification.level===0 ? 'notification' : 'error'
    return (
      <div className={name} id='notification-label'>
        {notification.content}
      </div>
    )
  }
}
export default Notification