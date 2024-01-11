import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Blogs = () => {
  const blogs = useSelector(
    state => state.blogReducer
  )
  if (!blogs || blogs.length === 0) null
  else {
    return (
      <table>
        <tbody>
          {
            blogs.map(blog =>(
              <tr key={blog.id}><td><Link to={`/blogs/${blog.id}`} >{blog.title}</Link></td></tr>  
            ))
          }
        </tbody>
      </table>
    )
  } 
}
export default Blogs