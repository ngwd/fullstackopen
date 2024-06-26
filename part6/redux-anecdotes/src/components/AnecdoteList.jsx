import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote, initializeAnecdotes } from '../reducers/anecdoteReducer'
import { setNotification_ex } from '../reducers/notificationReducer'

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
            dispatch(voteAnecdote(anecdote.id))
            dispatch(setNotification_ex(`you vote for \'${anecdote.content}\'`, 4000))
          }}> vote</button>
        </div>
      </div>
    )
  ) 

}
export default AnecdoteList