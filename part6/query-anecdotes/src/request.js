import axios from 'axios'
import anecdotes from '../../redux-anecdotes/src/services/anecdotes'
const baseUrl = 'http://localhost:3001/anecdotes' 
export const getAnecdotes = () => axios.get(baseUrl).then(res => res.data)

export const createAnecdote = newAnecdote => axios.post(baseUrl, newAnecdote).then(res => res.data)

export const upVote = anecdote => {
  return axios.put(`${baseUrl}/${anecdote.id}`, anecdote).then(res => res.data)
}