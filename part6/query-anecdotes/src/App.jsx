import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { getAnecdotes, upVote } from './request' 

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useNotify } from './NotificationContext'

const App = () => {
  const notifyWith = useNotify()
  const handleVote = (anecdote) => {
    console.log('vote')
    // const notifyWith = useNotify() // should not be here  
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    notifyWith(`anecdote '${anecdote.content}' voted`) 
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes
  })

  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation({
    mutationFn: upVote,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['anecdotes']})
    }
  })

  console.log(JSON.parse(JSON.stringify(result)))
  if (result.isLoading) {
    return <div>loading data ...</div>
  }
  const anecdotes = result.data 

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
