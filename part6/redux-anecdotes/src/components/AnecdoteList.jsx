import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote, initializeAnecdotes } from '../reducers/anecdoteReducer'
import { resetNotification, setNotification } from '../reducers/notificationReducer'

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
  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

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
            // dispatch(vote_notification(anecdote.content))
            dispatch(setNotification(`you vote for \'${anecdote.content}\'`))
            setTimeout(() => dispatch(resetNotification()), 4000)
          }}> vote</button>
        </div>
      </div>
    )
  ) 

}
export default AnecdoteList