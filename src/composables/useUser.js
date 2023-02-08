import { ref } from "vue"
import Api from "./useApi"

async function initUsers() {
  try {
    const { data } = await Api.get('/user')
    users.value = data
  }
  catch(err) {
    console.log(err)
  }
  _fetched.value = true
}

const _fetched = ref(false)
const users = ref([])
const randomUser = ref(null)

export const useUser = async () => {

  if(!_fetched.value) {
    await initUsers()
    getRandomUser()
  }

  function getUser(userId) {
    return users.value.find((user) => user.id == userId)
  }

  function getRandomUser() {
    const randomIndex = Math.floor(Math.random() * users.value.length)
    randomUser.value = users.value.at(randomIndex)
  }

  async function createUser(data) {
    await Api.post('/user', data)
  }

  async function updateUser(userId, data) {
    await Api.put(`/user/${userId}`, data)
  }

  async function deleteUser(userId) {
    const { data: deletedUser } = await Api.del(`/user/${userId}`)
    users.value = users.value.filter((user) => user.id !== deletedUser.id)
  }

  function resetUserData() {
    _fetched.value = false
  }

  return {
    users, randomUser,
    getUser, getRandomUser,
    createUser, updateUser, deleteUser,
    resetUserData
  }
}