import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { reset_notification, vote_notification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  // const anecdotes = useSelector(state => state.anecReducer)
  const anecdotes = useSelector(state => {
    const filterStr = state.filterReducer
    console.log('filter', filterStr)
    return  filterStr === '' ? 
            state.anecReducer :  
            state.anecReducer.filter(s => s.content.includes(filterStr))
  })
  const dispatch = useDispatch()

  return (
    anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => {
            dispatch(vote(anecdote.id))
            dispatch(vote_notification(anecdote.content))
            setTimeout(() => dispatch(reset_notification()), 4000)
          }}> vote</button>
        </div>
      </div>
    )
  ) 

}
export default AnecdoteList