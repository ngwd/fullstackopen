import { useState } from 'react'
import { useAppContext } from './AppContext'
import LoginBanner from './LoginBanner'
import Notification from './Notification'
import blogService from '../services/blogs'

const LoginForm = ()=> {
  const {setUser, setError} = useAppContext()
  const [userName, setUserName] = useState('ngwd')
  const [password, setPassword] = useState('fullstack')

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({ userName, password })
      setUser(user)
      setError({ code:0, message:`${user.name} logged in` })
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    }
    catch (exception) {
      setError({ code:1, message:'invalid password or user name' })
    }
    finally {
      setUserName('')
      setPassword('')
    }
  }

  return (
    <>
      <h2> login to application </h2>
      <Notification />
      <form onSubmit={handleLogin}>
        <div>
          user name <input type='text' value={userName} onChange={ ({ target }) => setUserName(target.value) } />
        </div>
        <div>
          password <input type='password' value={password} onChange={ ({ target }) => setPassword(target.value) } />
        </div>
        <button type='submit'>login</button>
        <LoginBanner />
      </form>
    </>
  )
}
export default LoginForm