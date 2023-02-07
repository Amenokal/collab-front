import { computed } from 'vue'
import Api from '@/composables/useApi'
import { useJWT } from './useJWT'

export const useAuth = () => {
  const { decodeToken, setToken, removeToken } = useJWT()

  const user = computed(() => {
    return decodeToken()
  })

  async function login(credentials) {
    const { data: token } = await Api.post('/login', credentials)
    setToken(token)
  }

  async function logout() {
    removeToken()
  }

  return {
    user, login, logout
  }
}