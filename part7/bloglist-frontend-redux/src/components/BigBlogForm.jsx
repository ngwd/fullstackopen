import { useRef } from 'react'
import { useParams } from 'react-router-dom'

import Notification from './Notification'
import LoginBanner from './LoginBanner'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blogs from './Blogs'
import Blog from './Blog'

const BigBlogForm = () => {
  const id = useParams().id
  const blogFormRef = useRef()
  return (
    <>
      <h2>blogs</h2>
      <Notification />
      <LoginBanner />
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      {id ? <Blog /> : <Blogs />}
    </>
  )
}
export default BigBlogForm