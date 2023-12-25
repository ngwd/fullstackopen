import { useDispatch } from 'react-redux'
import { add } from '../reducers/anecdoteReducer'
import { reset_notification, add_notification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const addAnecdote = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value

    e.target.anecdote.value = ''
    dispatch(add(content))
    dispatch(add_notification(content))
    setTimeout(()=>dispatch(reset_notification()), 4000)
  }
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote'/></div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}
export default AnecdoteForm