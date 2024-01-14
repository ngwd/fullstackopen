import { useEffect, useState, useRef } from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import Notification from './Notification'
import { useUser } from '../AuthenticationContext'
import blogService from '../services/blogs'

const Blogs = () => {
  const [blogs, setBlogs] = useState([])
  const blogFormRef = useRef()
  const user = useUser()
  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs( blogs )
    })
  }, [user])
  return (
    !user ? null : 
    <>
      <h2>blogs</h2>
      <Notification />
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      {blogs.sort((a, b) => a.likes<b.likes?1:-1).map(blog => {
        const userId = user?.id??''
        const removable = (blog.user?.id?.toString()??'') === userId
        return (
          <Blog key={blog.id} blog={blog} removable={removable} />
        )
      })}
    </>
  )
}
export default Blogs