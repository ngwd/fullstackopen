import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginBanner from './components/LoginBanner'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import loginService from './services/login'
import blogService from './services/blogs'

import { useDispatch } from 'react-redux'
import { setNotificationTimeout } from './reducers/notificationReducer'
import { syncBlogs, createBlog } from './reducers/blogReducer'

const App = () => {
  const dispatch = useDispatch()

  const [blogs, setBlogs] = useState([])
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [needRefresh, setNeedRefresh] = useState(false)
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })
  const blogFormRef = useRef()
  const handleNewBlogUpdate = (e) => setNewBlog(e)

  useEffect(() => {
    dispatch(syncBlogs())
  }, [user])

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
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

      dispatch(setNotificationTimeout(`${user.name} logged in`, 0, 4000))
    }
    catch (exception) {
      dispatch(setNotificationTimeout('invalid password or user name', 1, 4000))
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

  const upVote = (blog) => {
    blogService
      .addLikes(blog)
      .then(res => {
        setNeedRefresh(true)
        setTimeout(() => {
          setNeedRefresh(false)
        }, 4000)
      })
      .catch(exception => {
        dispatch(setNotificationTimeout(exception, 1, 4000))
      })
  } // upVote

  const remove = (blog) => {
    blogService
      .removeBlog(blog)
      .then(res => {
        dispatch(setNotificationTimeout(`${blog.title} is removed`, 0, 4000))
        setNeedRefresh(true)
      })
      .catch(exception => {
        dispatch(setNotificationTimeout('you are not authorized', 1, 4000))
      })
    return 0
  } // remove

  const addNew = () => {
    console.log('addNew clicked')
    const blog = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url
    }

    dispatch(createBlog(blog))
    dispatch(setNotificationTimeout(`a new blog: ${blog.title} by ${blog.author} added`, 0, 4000))
    dispatch(syncBlogs())

    // dispatch(setNotificationTimeout('fail to add new blog', 1, 4000))
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
        {
          blogs.sort((a, b) => a.likes<b.likes?1:-1).map(blog => {
            const removable = (blog.user?.id.toString()??'') === user.id
            return (
              <Blog key={blog.id} blog={blog} removable={removable} upVote={upVote} remove={remove} />
            )
          })
        }
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