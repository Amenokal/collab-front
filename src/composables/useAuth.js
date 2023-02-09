import { computed } from 'vue'
import jwt_decode from "jwt-decode"

import Api from '@/composables/useApi'
import { useStorage } from './useStorage'
import { useUser } from './useUser'
import { useMessage } from './useMessage'

export const useAuth = async () => {  
  const user = computed(() => {
    const { JWT } = useStorage()
    return jwt_decode(JWT.value)
  })
  
  async function login(credentials) {
    const { setJWT } = useStorage()
    const { data: jwt } = await Api.post('/login', credentials)
    setJWT(jwt)

    const { resetUserData } = await useUser()
    resetUserData()
    const { resetMessageData } = await useMessage()
    resetMessageData()
  }
  
  async function refresh() {
    const { setJWT } = useStorage()
    const { data: jwt } = await Api.post('/refresh', { userId: user.value.userId })
    setJWT(jwt)
    return jwt
  }

  async function logout() {
    const { removeJWT } = useStorage()
    removeJWT()
  }

  return {
    user, login, refresh, logout
  }
}