import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  const updateBlogs = b=>setBlogs(b)

  /*
  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs( blogs )
    })  
  }, [])
  */


  const handleLogin = async (e)=> {
    e.preventDefault()
    try {
      const user = await loginService.login({userName, password})
      setUser(user)
    }
    catch (exception) {
      setErrorMessage('invalid password or user name')
    }
    finally {
      setUserName('')
      setPassword('')
    }
  }
  const loginForm = () => {
    console.log("loginForm!!!!!!")
    return (
      <>
        <h2> login to application </h2>
        <form onSubmit={handleLogin}>
          <div>
            user name <input type='text' value={userName} onChange={({target})=>setUserName(target.value)} />
          </div>
          <div>
            password <input type='password' value={password} onChange={({target})=>setPassword(target.value)} />
          </div>
          <button type='submit'>login</button>
          <Notification errorMessage={errorMessage} user={user}/>
        </form>
      </>
    )
  }
  const blogForm = () => {
    return (
      <>
        <h2>blogs</h2>
        <Notification errorMessage={errorMessage} user={user}/>
        <Blogs user={user} blogs={blogs} updateBlogs={updateBlogs}/>
      </>
    )
  }
  return (
    <div>
      {user===null ? loginForm() : blogForm()}  
    </div>
  )
}

export default App