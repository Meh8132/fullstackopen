import axios from 'axios'

let authToken = null
const blogsApiPath = '/api/blogs'

const setToken = (userToken) => {
  authToken = userToken
}

const getAll = async () => {
  const { data } = await axios.get(blogsApiPath)
  return data
}

const create = async (blog) => {
  const config = {
    headers: { Authorization: `bearer ${authToken}` }
  }
  const { data } = await axios.post(blogsApiPath, blog, config)
  return data
}

export default { setToken, getAll, create }
