import { computed } from 'vue'
import Api from '@/composables/useApi'
import { useJWT } from './useJWT'
import { useUser } from './useUser'
import { useMessage } from './useMessage'

export const useAuth = async () => {
  const { decodeToken, setToken, removeToken } = useJWT()
  
  const user = computed(() => decodeToken())
  
  async function login(credentials) {
    const { resetUserData } = await useUser()
    const { resetMessageData } = await useMessage()
    resetMessageData()
    resetUserData()

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