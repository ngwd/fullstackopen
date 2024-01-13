import blogService from '../services/blogs'

import { useState } from 'react'
import { useUser, useLogin } from '../AuthenticationContext'
import { useNotifier } from '../NotificationContext'

const LoginForm = () => {
  const [userName, setUserName] = useState('ngwd')
  const [password, setPassword] = useState('fullstack')

  const user = useUser()
  const login = useLogin()
  const notifyWith = useNotifier()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await login({ userName, password })
      // setUser(user)

      notifyWith(`${user.name} logged in`)
      blogService.setToken(user.token)
    }
    catch (exception) {
      notifyWith('invalid password or user name')
    }
    finally {
      setUserName('')
      setPassword('')
    }
  }
  return (
    <>
      {
        user ? null : 
        (
          <form onSubmit={handleLogin}>
            <h2> login to application </h2>
            <div>
              user name <input type='text' id='username' value={userName} onChange={ ({ target }) => setUserName(target.value) } />
            </div>
            <div>
              password <input type='password' id='password' value={password} onChange={ ({ target }) => setPassword(target.value) } />
            </div>
            <button type='submit' id='login-button'>login</button>
          </form>
        )
      }
    </>
  )
}
export default LoginForm