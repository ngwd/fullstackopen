import blogService from '../services/blogs'
import { useUser, useLogout } from "../AuthenticationContext"
const LoginBanner = () => {
  const logout = useLogout()
  const user = useUser()
  const handleLogout = () => {
    blogService.setToken(null)
    logout()
  }
  if (!user) return null
  return <p> {user.name} logged in <button onClick={handleLogout}>logout</button></p>
}

export default LoginBanner