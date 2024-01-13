import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { removeBlog, upVoteBlog, addNewComment } from '../reducers/blogReducer'

const Blog = () => {
  const id = useParams().id
  const blog = useSelector(
    ({ blogReducer }) => blogReducer?.find(u => u.id === id) 
  )
  const user = useSelector(
    state => state.loginReducer
  )
  const navigate = useNavigate()
  const dispatch = useDispatch()

  if (!blog || !user) return null

  const userId = user?.id??''
  const removable = (blog.user?.id?.toString()??'') === userId

  const remove = blog => {
    dispatch(removeBlog(blog))
    navigate('/blogs')
  }

  const upVote = blog => {
    dispatch(upVoteBlog(blog))
  }
  const newComment = (e) => {
    e.preventDefault()
    const comment = e.target.comment.value
    dispatch(addNewComment(blog, comment))
    e.target.comment.value = ''
  }

  const buttonVisible = { display: removable ? '' : 'none' }

  return (
    <div className='blog'>
      <p key={blog.title}><b>{blog.title} <i>by</i> {blog.author}</b></p>
      <p><a href={blog.url}>{blog.url}</a></p>
      <p>like {blog.likes||0} <button onClick={() => upVote(blog)}>like</button></p>
      <p>{blog.user?.name??''}</p>
      <button style={ buttonVisible } onClick={ () => remove(blog) }>remove</button>
      <h4>comments</h4>
      <form onSubmit={ newComment }>
        <input name='comment' id='comment' />
        <button type='submit'>add comment</button>
      </form>
      <ul>
        {
          blog.comments.map(comment => (
            <li key = {comment}>{comment}</li>
          ))
        }
      </ul>
    </div>
  )
}
export default Blog