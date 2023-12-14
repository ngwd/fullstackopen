import blogService from '../services/blogs'

const LoginBanner = ({error, user, setUser}) => {
  const logout = () => {
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }
  if (error === null) {
    if (user) {
      return <p> {user.name} logged in <button onClick={logout}>logout</button></p>
    }
    else {
      return null
    }
  }
  else /*if (errorMessage !== '') */ {
    // return <p> {errorMessage} </p>
  }
}

export default LoginBanner 