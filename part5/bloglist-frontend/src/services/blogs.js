import axios from 'axios'
const site='http://localhost:3003'

let token = null
const setToken = (newToken)=>{
  token=`Bearer ${newToken}`
}
const findBlogsByUserId = (userId) => {
  const route = '/api/users/'
  const url = `${site}${route}${userId}`
  console.log('url ', url)
  const req = axios.get(url)
  return req.then(res => res.data.blogs)
}

const getAll = () => {
  const route = '/api/blogs/'
  const request = axios.get(`${site}${route}`)
  return request.then(response => response.data)
}
export default {setToken, findBlogsByUserId, getAll}