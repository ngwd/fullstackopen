import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { removeBlog, upVoteBlog } from '../reducers/blogReducer'

const Blog = () => {
  const blogs = useSelector(
    state => state.blogReducer
  )
  if (!blogs || blogs.length === 0) return null
  const id = useParams().id
  const blog = blogs.find(b => b.id === id)
  if (!blog) return null

  const user = useSelector(
    state => state.loginReducer
  )
  const navigate = useNavigate()

  const userId = user?.id??''
  const removable = (blog.user?.id?.toString()??'') === userId

  const dispatch = useDispatch()
  const remove = blog => {
    dispatch(removeBlog(blog))
    navigate('/blogs')
  }

  const upVote = blog => {
    dispatch(upVoteBlog(blog))
  }

  const buttonVisible = { display: removable ? '' : 'none' }
  const comments = blog.comments??[]

  return (
    <div className='blog'>
      <p key={blog.title}><b>{blog.title} <i>by</i> {blog.author}</b></p>
      <p><a href={blog.url}>{blog.url}</a></p>
      <p>like {blog.likes||0} <button onClick={() => upVote(blog)}>like</button></p>
      <p>{blog.user?.name??''}</p>
      <h4>comments</h4>
      <ul>
        {comments.map(comment => (
          <li key = {comment}>{comment}</li>
        ))}
      </ul>
      <button style={buttonVisible} onClick={ () => remove(blog) }>remove</button>
    </div>
  )
}
export default Blog