import { useDispatch } from 'react-redux'
import { addNewComment } from '../reducers/blogReducer'
import { useState } from 'react'
const Comment = ({ blog }) => {
  const dispatch = useDispatch()
  const [comments, setComments] = useState(blog.comments??[])
  // const comments = blog.comments??[]

  const newComment = (e) => {
    e.preventDefault()
    const comment = e.target.comment.value
    dispatch(addNewComment(blog, comment))
    e.target.comment.value = ''
    setComments(comments.concat(comment))
  }

  return (
    <>
      <h4>comments</h4>
      <form onSubmit={ newComment }>
        <input name='comment' id='comment' />
        <button type='submit'>add comment</button>
      </form>
      <ul>
        {comments.map(comment => (
          <li key = {comment}>{comment}</li>
        ))}
      </ul>
    </>
  )
}
export default Comment