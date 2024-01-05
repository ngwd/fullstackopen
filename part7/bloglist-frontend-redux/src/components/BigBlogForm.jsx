import { useRef } from 'react'

import Notification from './Notification'
import LoginBanner from './LoginBanner'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blogs from './Blogs'

const BigBlogForm = () => {
  const blogFormRef = useRef()
  return (
    <>
      <h2>blogs</h2>
      <Notification />
      <LoginBanner />
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      <Blogs />
    </>
  )
}
export default BigBlogForm