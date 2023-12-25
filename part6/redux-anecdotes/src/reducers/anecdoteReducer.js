import { createSlice } from '@reduxjs/toolkit'

const anecdotesAtStart = [
  /*
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  */
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    vote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = {...anecdoteToChange, votes: anecdoteToChange.votes+1}
      return state.map(a => a.id !== id ? a : changedAnecdote).sort((a, b) => a.votes > b.votes ? -1 : 1)
    },
    add(state, action) {
      const anec = asObject(action.payload)
      state.push(anec)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})
/*
export const vote = (id) => { return { type: 'VOTE', payload: { id } } }
export const add = (content) => { return { type: 'ADD', payload: { content } } }
*/
export const { add, vote, setAnecdotes } = anecSlice.actions
export default anecSlice.reducer