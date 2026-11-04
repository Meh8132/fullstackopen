import axios from 'axios'

const loginApiPath = '/api/login'

const login = async (credentials) => {
  const { data } = await axios.post(loginApiPath, credentials)
  return data
}

export default { login }
