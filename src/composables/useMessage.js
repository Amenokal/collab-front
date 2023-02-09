import { ref } from "vue"
import Api from "./useApi"

const _fetched = ref(false)
const messages = ref([])

async function initMessages() {
  try {
    const { data } = await Api.get('/message')
    messages.value = data
    _fetched.value = true
  }
  catch(err) {
    console.log(err)
  }
}

export const useMessage = async () => {

  if(!_fetched.value) {
    await initMessages()
  }

  async function sendMessage(data) {
    await Api.post('/message', data)
  }

  async function deleteMessage(userId) {
    const { data: deletedMessage } = await Api.del(`/message/${userId}`)
    messages.value = messages.value.filter((msg) => msg.id != deletedMessage.id)
  }

  function resetMessageData() {
    _fetched.value = false
  }

  return {
    messages,
    sendMessage, deleteMessage,
    resetMessageData
  }
}