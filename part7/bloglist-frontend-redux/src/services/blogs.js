import axios from 'axios'
const site='http://localhost:3003'
const route = '/api/blogs/'

let token = null
const setToken = (newToken) => {
  token=`Bearer ${newToken}`
}

const header = { headers: { Authorization: token } }

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

const aggregateOnUser = async () => {
  const res = await axios.get(`${site}${route}`)
  const result = res.data.reduce((map, blog) => {
    const userId= blog.user?.id??''
    if (!map[userId]) {
      map[userId] = [blog]
    }
    else {
      map[userId].push(blog)
    }
    return map
  }, {})
  return result
}

const removeBlog = (blog) => {
  const id = blog.id.toString()
  const req = axios.delete(`${site}${route}${id}`, header)
  return req.then(res => res.data)
}
const update = (blog) => {
  const url = `${site}${route}${blog.id}`
  const req = axios.put(url, blog)
  return req.then(res => res.data)
}

const addNew = async (newObj) => {
  console.log('token, ', token)
  const res = await axios
    .post(`${site}${route}`, newObj, header)
  if (res.status === 201)
    return res.data
  else
    return null
}

const addNewComment = async (id, comment) => {
  const request = await axios.post(`${site}${route}${id}/comment`, { comment }, header)
  return request.data
}

export default { setToken, findBlogsByUserId, getAll, removeBlog, addNew, addNewComment, update, aggregateOnUser }