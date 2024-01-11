import Notification from './Notification'
import LoginBanner from './LoginBanner'
import UserView from './UserView'
import { useParams } from 'react-router-dom'
const BigUserView = () => {
  const id = useParams().id
  return (
    <>
      <h2>blogs</h2>
      <Notification />
      <LoginBanner />
      <UserView id={id}/>
    </>
  )
}
export default BigUserView