import blogService from '../services/blogs'

const LoginBanner = ({ error, user, setUser }) => {
  const logout = () => {
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }
  if (!user) return null
  return <p> {user.name} logged in <button onClick={logout}>logout</button></p>
}

export default LoginBanner