import axios from 'axios'
const site='http://localhost:3003'
const route = '/api/blogs/'

let token = null
const setToken = (newToken) => {
  token=`Bearer ${newToken}`
}
const findBlogsByUserId = (userId) => {
  const uroute = '/api/users/'
  const url = `${site}${uroute}${userId}`
  const req = axios.get(url)
  return req.then(res => res.data.blogs)
}

const getAll = () => {
  const req = axios.get(`${site}${route}`)
  return req.then(res => res.data)
}

const removeBlog = async (blog) => {
  const id = blog.id.toString()
  const config = { headers: { Authorization: token } }
  // const req = axios.delete(`${site}${route}${id}`, config)
  // return req.then(res => res.data)

  const res = await axios.delete(`${site}${route}${id}`, config)
  return res.data
  // return req.then(res => res.data)
}

const update = (blog) => {
  const url = `${site}${route}${blog.id}`
  const req = axios.put(url, blog)
  return req.then(res => res.data)
}

const addNew = async (newObj) => {
  const config = { headers: { Authorization: token } }
  console.log('token, ', token)
  const res = await axios
    .post(`${site}${route}`, newObj, config)
  if (res.status === 201)
    return res.data
  else
    return null
}
export default { setToken, findBlogsByUserId, getAll, removeBlog, addNew, update }