import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginBanner from './components/LoginBanner'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import loginService from './services/login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [userName, setUserName] = useState('ngwd')
  const [password, setPassword] = useState('fullstack')
  const [user, setUser] = useState(null)
  const [needRefresh, setNeedRefresh] = useState(false)
  const [error, setError] = useState(null)
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })
  const blogFormRef = useRef()
  const handleErrorChange = (e) => setError(e)
  const handleNewBlogUpdate = (e) => setNewBlog(e)

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
        setError({ code:5, message:exception })
        setTimeout(() => setError(null), 4000)
      })
  } // upVote

  const remove = (blog) => {
    blogService
      .removeBlog(blog)
      .then(res => {
        setError({ code:0, message:`${blog.title} is removed` })
        setNeedRefresh(true)
        setTimeout(() => {
          setError(null)
          setNeedRefresh(false)
        }, 4000)
      })
      .catch(exception => {
        setError({ code:4, message:'you are not authorized' })
        setTimeout(() => setError(null), 4000)
      })
    return 0
  } // remove

  const addNew = () => {
    console.log('addNew clicked')
    const res = blogService.addNew({
      title: newBlog.title, 
      author: newBlog.author, 
      url: newBlog.url 
    })
    if (res) {
      setNewBlog({title: '', author: '', url: ''})
      setError({ code:0, message:`a new blog: ${newBlog.title} by ${newBlog.author} added` })
      setNeedRefresh(true)
    }
    else {
      setError({ code:2, message:'fail to add new blog' })
    }
    blogFormRef.current.toggleVisibility()
  }

  const loginForm = () => {
    return (
      <>
        <h2> login to application </h2>
        <Notification error={error} handleErrorChange={handleErrorChange} />
        <form onSubmit={handleLogin}>
          <div>
            user name <input type='text' value={userName} onChange={ ({ target }) => setUserName(target.value) } />
          </div>
          <div>
            password <input type='password' value={password} onChange={ ({ target }) => setPassword(target.value) } />
          </div>
          <button type='submit'>login</button>
          <LoginBanner user={user} logout={logout}/>
        </form>
      </>
    )
  }
  const blogForm = () => {
    return (
      <>
        <h2>blogs</h2>
        <Notification error={error} handleErrorChange={handleErrorChange} />
        <LoginBanner user={user} logout={logout}/>
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <BlogForm newBlog={newBlog} handleNewBlogUpdate={handleNewBlogUpdate} addNew={addNew} />
        </Togglable>
        {blogs.sort((a, b) => a.likes<b.likes?1:-1).map(blog =>{
          const removable =  (blog.user?.id.toString()??'') == user.id
          return (
            <Blog key={blog.id} blog={blog} removable={removable} upVote={upVote} remove={remove} />
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