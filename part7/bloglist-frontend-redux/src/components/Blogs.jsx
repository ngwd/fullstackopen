import { useSelector } from 'react-redux'
import Blog from './Blog'

const Blogs = () => {
  const blogs = useSelector(
    state => state.blogReducer
  )
  const user = useSelector(
    state => state.loginReducer
  )
  if (!blogs || blogs.length === 0) null
  else {
    return (blogs
      // .sort((a, b) => b.likes - a.likes)
      // .sort((a, b) => a.likes < b.likes ? 1 : -1)
      .map(blog => {
        const removable = (blog.user?.id?.toString()??'') === user.id
        return (
          <Blog key={blog.id} blog={blog} removable={removable} />
        )
      })
    )
  } 
}
export default Blogs