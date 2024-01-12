import { useRef } from 'react'
import { useParams } from 'react-router-dom'

import Notification from './Notification'
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
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm hideMe={() => blogFormRef.current.toggleVisibility()} />
      </Togglable>
      {id ? <Blog /> : <Blogs />}
    </>
  )
}
export default BigBlogForm