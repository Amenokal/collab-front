import axios from 'axios'

export const storageKey = "jwt"

function createInstance() {
  let options = {
    baseURL:  'http://localhost:3000'
  }
  
  const token = localStorage.getItem(storageKey)
  if(token) options.headers = { Authorization: token }

  return axios.create(options)
}

const useApi = () => {

  async function get(url) {
    const instance = createInstance()
    return await instance.get(url)
  }
  async function post(url, body) {
    const instance = createInstance()
    return await instance.post(url, body)
  }
  async function put(url, body) {
    const instance = createInstance()
    return await instance.put(url, body)
  }
  async function del(url) {
    const instance = createInstance()
    return await instance.delete(url)
  }

  return {
    get, post, put, del
  }
}

export default useApi()