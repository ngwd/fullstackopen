import Notification from './Notification'
import UserView from './UserView'
import { useParams } from 'react-router-dom'
const BigUserView = () => {
  const id = useParams().id
  return (
    <>
      <h2>blogs</h2>
      <Notification />
      <UserView id={id}/>
    </>
  )
}
export default BigUserView