const LoginBanner = ({ user, logout }) => {
  if (!user) return null
  return <p> {user.name} logged in <button onClick={logout}>logout</button></p>
}

export default LoginBanner