import axios from 'axios'
import { useStorage } from './useStorage'

async function createInstance() {
  const options = {
    baseURL:  'http://localhost:3000'
  }
  
  const { JWT } = useStorage()
  if(JWT.value) options.headers = { Authorization: JWT.value }

  return axios.create(options)
}

const useApi = () => {

  async function get(url) {
    const instance = await createInstance()
    return await instance.get(url)
  }

  async function post(url, body) {
    const instance = await createInstance()
    return await instance.post(url, body)
  }

  async function put(url, body) {
    const instance = await createInstance()
    return await instance.put(url, body)
  }

  async function del(url) {
    const instance = await createInstance()
    return await instance.delete(url)
  }

  return {
    get, post, put, del
  }
}

export default useApi()