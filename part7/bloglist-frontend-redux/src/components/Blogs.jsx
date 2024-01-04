import { useSelector } from 'react-redux'
import Blog from './Blog'
const Blogs = ({ userid }) => {
  const blogs = useSelector(
    state => state.blogReducer
  )
  if (!blogs) null
  else {
    return (blogs
      .sort((a, b) => a.likes < b.likes ? 1 : -1)
      .map(blog => {
        const removable = (blog.user?.id.toString()??'') === userid
        return (
          <Blog key={blog.id} blog={blog} removable={removable} />
        )
      })
    )
  } 
}
export default Blogs