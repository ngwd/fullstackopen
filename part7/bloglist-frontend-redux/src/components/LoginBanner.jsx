import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/loginReducer'

const LoginBanner = () => {

  const dispatch = useDispatch()
  const user = useSelector(
    state => state.loginReducer
  )

  const handleLogout = () => {
    dispatch(logout())
  }

  if (!user) return null
  return <p> {user.name} logged in <button onClick={handleLogout}>logout</button></p>
}

export default LoginBanner