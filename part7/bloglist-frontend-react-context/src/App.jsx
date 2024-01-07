import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginBanner from './components/LoginBanner'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import { useNotify } from './NotificationContext'

import loginService from './services/login'
import blogService from './services/blogs'

const App = () => {
  const notifyWith = useNotify()
  const [blogs, setBlogs] = useState([])
  const [userName, setUserName] = useState('ngwd')
  const [password, setPassword] = useState('fullstack')
  const [user, setUser] = useState(null)
  const [needRefresh, setNeedRefresh] = useState(false)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs( blogs )
      if (needRefresh) {
        setNeedRefresh(false)
      }
    })
  }, [user, needRefresh])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
    }
  }, [])


  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({ userName, password })
      setUser(user)
      // setError({ code:0, message:`${user.name} logged in` })
      notifyWith(`${user.name} logged in`)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    }
    catch (exception) {
      // setError({ code:1, message:'invalid password or user name' })
      notifyWith('invalid password or user name')
    }
    finally {
      setUserName('')
      setPassword('')
    }
  }

  const logout = () => {
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }



  const loginForm = () => {
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
          <LoginBanner user={user} logout={logout}/>
        </form>
      </>
    )
  }
  const blogForm = () => {
    return (
      <>
        <h2>blogs</h2>
        <Notification />
        <LoginBanner user={user} logout={logout}/>
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <BlogForm />
        </Togglable>
        {blogs.sort((a, b) => a.likes<b.likes?1:-1).map(blog => {
          const removable = (blog.user?.id?.toString()??'') === user.id
          return (
            <Blog key={blog.id} blog={blog} removable={removable} />
          )
        })}
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