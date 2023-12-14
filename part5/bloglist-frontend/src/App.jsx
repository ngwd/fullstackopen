import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import NewBlog from './components/NewBlog'
import Login from './components/Login'
import loginService from './services/login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [userName, setUserName] = useState('ngwd')
  const [password, setPassword] = useState('fullstack')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  /*
  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs( blogs )
    })  
  }, [])
  */
  useEffect(()=>{
    const loggedUserJson = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
    }
  }, [])


  const handleLogin = async (e)=> {
    e.preventDefault()
    try {
      const user = await loginService.login({userName, password})
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
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
          <Login errorMessage={errorMessage} user={user} setUser={setUser}/>
        </form>
      </>
    )
  }
  const blogForm = () => {
    return (
      <>
        <h2>blogs</h2>
        <Login errorMessage={errorMessage} user={user} setUser={setUser}/>
        <NewBlog />
        <Blogs user={user} blogs={blogs} setBlogs={setBlogs}/>
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