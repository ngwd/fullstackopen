import axios from 'axios'
const baseUrl = '/api/login'
const site='http://localhost:3003'

const login = async (credential) => {
  const res = await axios.post(`${site}${baseUrl}`, credential)
  return res.data
}

export default { login }