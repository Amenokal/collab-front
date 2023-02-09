import { ref } from "vue"

const JWT_KEY = "collaborateurs-jwt"

export const useStorage = () => {

  const JWT = ref(getJWT())

  function getJWT() {
    return localStorage.getItem(JWT_KEY)
  }
  
  function setJWT(token) {
    return localStorage.setItem(JWT_KEY, token)
  }
  
  function removeJWT() {
    return localStorage.removeItem(JWT_KEY)
  }

  return {
    JWT, getJWT, setJWT, removeJWT
  }
}