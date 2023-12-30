import { createAnecdote } from '../request' 
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useNotify } from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const notifyWith = useNotify()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['anecdotes']})
    },
    onError: (error) => {
      notifyWith(error.response.data.error)
    }
  })

  const toObject = content => {
    return {
      id: (10_000*Math.random()).toFixed(0),
      content,
      votes: 0
    }
  } 
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(toObject(content))
    notifyWith(`you create '${content}'`)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
