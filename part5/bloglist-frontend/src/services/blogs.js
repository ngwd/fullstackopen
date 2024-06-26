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

const removeBlog = (blog) => {
  const id = blog.id.toString()
  const config = { headers: { Authorization: token } }
  const req = axios.delete(`${site}${route}${id}`, config)
  return req.then(res => res.data)
}
const addLikes = (blog) => {
  const url = `${site}${route}${blog.id}`
  const newBlog= {
    likes:1 + blog.likes ?? 0,
  }
  const req = axios.put(url, newBlog)
  return req.then(res => res.data)
}


const addNew = async (newObj) => {
  const config = { headers: { Authorization: token } }
  console.log('token, ', token)
  const res = await axios
    .post(`${site}${route}`, newObj, config)
  console.log('add new res ', res)
  if (res.data.status === 201)
    return res.data
  else
    return null
}
export default { setToken, findBlogsByUserId, getAll, removeBlog, addNew, addLikes }