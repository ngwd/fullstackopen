import { useEffect, useState, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import { useUser } from '../AuthenticationContext'

const Blogs = () => {
  const [blogs, setBlogs] = useState([])
  const blogFormRef = useRef()
  const user = useUser()
  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs( blogs )
      if (needRefresh) {
        setNeedRefresh(false)
      }
    })
  }, [user])
  return (
    <>
      <h2>blogs</h2>
      <Notification />
      <LoginBanner />
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
export default Blogs