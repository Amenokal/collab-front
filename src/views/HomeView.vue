<template>
  <div class="layout">
    <NavBar />

    <main>
      <section class="banner">
        <h1>Bienvenue, {{ loggedUser.firstname }} !</h1>
      </section>

      <div class="content">
        <section>
          <div class="banner"><h2>Dites bonjour !</h2></div>

          <UserCard :user="randomUser" class="unique"/>

          <div class="emotes">
            <div @click="handleSendMsg($event)"><span>✋</span></div>
            <div @click="handleSendMsg($event)"><span>🙌</span></div>
            <div @click="handleSendMsg($event)"><span>✌️</span></div>
            <div @click="handleSendMsg($event)"><span>🤟</span></div>
            <div @click="handleSendMsg($event)"><span>🖖</span></div>
            <div @click="handleGetRandomUser" class="reload-icon"><span><img src="@/assets/imgs/reload.svg" /></span></div>
          </div>
        </section>

        <section>
          <div class="banner"><h2>Messagerie interne</h2></div>

          <div class="message-wrapper">
            <p v-if='!messages.length' class="message">Pas de messages</p>
          </div>

          <TransitionGroup name="messages">
            <div v-for="msg in messages" :key="msg.id" class="message-wrapper">
              <p class="message"><span>{{ msgTime(msg.createdAt) }}</span></p>
              <img class="message-photo" :src="msg.senderPhoto" />
              <p class="message-emote" v-html="msg.content"></p>
              <p class="message-delete" @click="handleDeleteMsg(msg.id)">X</p>
            </div>
          </TransitionGroup>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import NavBar from '@/components/NavBar.vue'
import UserCard from '@/components/UserCard.vue'
import { useAuth } from '@/composables/useAuth'
import { useMessage } from '@/composables/useMessage'
import { useUser } from '@/composables/useUser'

const { user: loggedUser } = await useAuth()
const { randomUser, getRandomUser } = await useUser()
const { messages, sendMessage, deleteMessage } = await useMessage()

const msgTime = computed(() => (time) => {
  const date = new Date(time)
  return date.getHours().toString().padStart(2, '0') + ':'
    + date.getMinutes().toString().padStart(2, '0') + ':'
    + date.getSeconds().toString().padStart(2, '0')
})

async function handleGetRandomUser() {
  const card = document.querySelector('.unique')
  card.classList.remove('anim-in')
  card.classList.add('anim-out')

  setTimeout(async () => {
    getRandomUser()

    document.querySelector('.unique img').onload = () => {
      card.classList.remove('anim-out')
      card.classList.add('anim-in')

      setTimeout(() => {
        const persist = document.querySelector('.persist')
        if(persist) persist.classList.remove('persist')
        const emotes = document.querySelectorAll('.emotes > div:not(.persist)')
        emotes.forEach((el) => el.classList.remove('hide'))
      }, 300)
    }
  }, 600)
}

async function handleSendMsg(e) {
  const persist = e.target.closest('div')
  persist.classList.add('persist')
  const emotes = document.querySelectorAll('.emotes > div:not(.persist)')
  emotes.forEach((el) => el.classList.add('hide'))

  const msg = {
    senderId: loggedUser.value.userId,
    receiverId: randomUser.value.id,
    content: e.target.innerHTML
  }
  await sendMessage(msg)
  handleGetRandomUser()
}

async function handleDeleteMsg(msgId) {
  await deleteMessage(msgId)
}
</script>