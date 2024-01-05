import { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import LoginBanner from './components/LoginBanner'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import { useDispatch, useSelector } from 'react-redux'
import { syncBlogs, createBlog } from './reducers/blogReducer'
import { setUser } from './reducers/loginReducer'
import LoginForm from './components/LoginForm'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(
    state => state.loginReducer
  )

  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })
  const blogFormRef = useRef()
  const handleNewBlogUpdate = (e) => setNewBlog(e)

  useEffect(() => {
    dispatch(syncBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
    }
  }, [])

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

  const blogForm = () => {
    return (
      <>
        <h2>blogs</h2>
        <Notification />
        <LoginBanner />
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <BlogForm newBlog={newBlog} handleNewBlogUpdate={handleNewBlogUpdate} addNew={addNew} />
        </Togglable>
        <Blogs userid={user.id}/>
      </>
    )
  }
  return (
    <div>
      {!user ? (
        <LoginForm />
      ) : 
        blogForm()
      }
    </div>
  )
}

export default App