import blogService from '../services/blogs'

const Login = ({errorMessage, user, setUser}) => {
  const logout = () => {
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }
  if (errorMessage === '' || errorMessage === null) {
    if (user) {
      return <p> {user.name} logged in <button onClick={logout}>logout</button></p>
    }
    else {
      return null
    }
  }
  else /*if (errorMessage !== '') */ {
    return <p> {errorMessage} </p>
  }
}

export default Login 