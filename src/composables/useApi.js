import axios from 'axios'
import { useAuth } from './useAuth'
import { useStorage } from './useStorage'

async function createInstance() {
  const instance = axios.create({
    baseURL:  'http://localhost:3000'
  })

  // Add a request interceptor
  instance.interceptors.request.use(
    // Do something before request is sent
    (config) => {
      const { JWT } = useStorage()
      if(JWT.value) config.headers = { Authorization: JWT.value }
      return config;
    },
    // Do something with request error
    (error) => {
      return Promise.reject(error);
    }
  )
  
  // Add a response interceptor
  instance.interceptors.response.use(
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    (response) => {
      return response;
    },
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    async (error) => {
      if(error.response.data._logout) {
        const { logout } = await useAuth()
        await logout()
      }
      else if(error.response.data._refresh) {
        const { refresh } = await useAuth()
        await refresh()

        const { JWT } = useStorage()
        error.config.headers.Authorization = JWT.value
        
        await axios(error.config)
      }
      return Promise.reject(error);
    }
  )

  return instance
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