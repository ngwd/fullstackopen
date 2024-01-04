import { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import LoginBanner from './components/LoginBanner'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import loginService from './services/login'
import blogService from './services/blogs'

import { useDispatch } from 'react-redux'
import { setTimeoutNotification } from './reducers/notificationReducer'
import { syncBlogs, createBlog } from './reducers/blogReducer'

const App = () => {
  const dispatch = useDispatch()

  const [userName, setUserName] = useState('ngwd')
  const [password, setPassword] = useState('fullstack')
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })
  const blogFormRef = useRef()
  const handleNewBlogUpdate = (e) => setNewBlog(e)

  useEffect(() => {
    dispatch(syncBlogs())
  // }, [user])
  }, [dispatch])

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
      console.log('handleLogin: user ', user)
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

      // dispatch(setTimeoutNotification(`${user.name} logged in`, 0, 4000))
    }
    catch (exception) {
      console.log('handleLogin ex', exception)
      dispatch(setTimeoutNotification('invalid password or user name', 1, 4000))
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

  const addNew = () => {
    console.log('addNew clicked')
    const blog = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url
    }
    dispatch(createBlog(blog))
    blogFormRef.current.toggleVisibility()
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
          <BlogForm newBlog={newBlog} handleNewBlogUpdate={handleNewBlogUpdate} addNew={addNew} />
        </Togglable>
        <Blogs userid={user.id}/>
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