const logout = () => {
  console.log('log out not yet implement')
}
const Notification = ({errorMessage, user}) => {
  console.log('Notification !!!!!!')
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

export default Notification