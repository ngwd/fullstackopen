import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../reducers/loginReducer'

const LoginBanner = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const user = useSelector(
    state => state.loginReducer
  )

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  if (!user) return null
  return <span> {user.name} logged in <button onClick={handleLogout}>logout</button></span>
}

export default LoginBanner