import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Notification from './Notification'
import { login } from '../reducers/loginReducer'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      dispatch(login({ userName, password }))
    }
    catch (exception) {
      console.log('handleLogin ex', exception)
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
          user name <input type='text' id='username' value={userName} onChange={ ({ target }) => setUserName(target.value) } />
        </div>
        <div>
          password <input type='password' id='password' value={password} onChange={ ({ target }) => setPassword(target.value) } />
        </div>
        <button type='submit' id='login-button'>login</button>
      </form>
    </>
  )
}
export default LoginForm 