import { useRef } from 'react'
import {useAppContext} from './AppContext'
import LoginBanner from './LoginBanner'
import Notification from './Notification'
import NewBlogForm from './NewBlogForm'
import Togglable from './Togglable'
import Blog from './Blog'
const BlogForm = () => {
  const {user} = useAppContext()
  const blogFormRef = useRef()
  return (
    <>
      <h2>blogs</h2>
      <Notification />
      <LoginBanner />
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <NewBlogForm blogFormRef={blogFormRef}/>
      </Togglable>
      {
        blogs
          .sort((a, b) => a.likes < b.likes ? 1 : -1)
          .map(blog => {
            const removable = (blog.user?.id.toString()??'') == user.id
            return (
              <Blog key={blog.id} blog={blog} removable={removable} />
            )
          })
      }
    </>
  )
}
export default BlogForm