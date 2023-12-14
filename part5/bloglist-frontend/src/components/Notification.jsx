import blogService from '../services/blogs'

let buttonText = 'logout'
const Notification = ({errorMessage, user}) => {
  const logout = () => {
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogAppUser')
    buttonText = 'login'
  }
  if (errorMessage === '' || errorMessage === null) {
    if (user) {
      return <p> {user.name} logged in <button onClick={logout}>{buttonText}</button></p>
    }
    else {
      return null
    }
  }
  else /*if (errorMessage !== '') */ {
    return <p> {errorMessage} </p>
  }
}

export default Notification