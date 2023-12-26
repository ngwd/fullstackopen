import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const createNew = async (content) => {
  const obj = asObject(content)
  const res = await axios.post(baseUrl, obj)
  return res.data
}

export default { getAll, createNew, asObject }
