import jwt_decode from "jwt-decode"

export const storageKey = "jwt"

export const useJWT = () => {

  function getToken() {
    return localStorage.getItem(storageKey)
  }

  function decodeToken() {
    const token = getToken()
    console.log(token)
    if(token) {
      const tok = jwt_decode(token)
      return tok
    }
    else return false
  }

  function setToken(token) {
    return localStorage.setItem(storageKey, token)
  }
  
  function removeToken() {
    return localStorage.removeItem(storageKey)
  }

  return {
    getToken, decodeToken, setToken, removeToken
  }
}