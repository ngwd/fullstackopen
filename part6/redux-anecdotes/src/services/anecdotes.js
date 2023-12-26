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
const upVote = async (id) => {
  const res0 = await axios.get(`${baseUrl}/${id}`)
  const obj = res0.data
  console.log('res0', obj)
  const new_obj = {...obj, votes: obj.votes + 1}
  const res = await axios.put(`${baseUrl}/${id}`, new_obj)
  return res.data
}

export default { getAll, createNew, asObject, upVote }
