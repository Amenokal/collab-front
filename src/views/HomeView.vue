<template>
  <div class="layout">
    <NavBar />

    <main>
      <section class="banner">
        <h1>Bienvenue, {{ user.firstname }} !</h1>
      </section>

      <section class="banner"><h2>Connaissez vous...</h2></section>

      <UserCard :user="randomUser"/>
      <button @click="handleGetRandomUser">DIRE BONJOUR A QUELQU'UN D'AUTRE</button>
    </main>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import NavBar from '@/components/NavBar.vue'
import UserCard from '@/components/UserCard.vue';

import Api from '@/composables/useApi'
import { useJWT } from '@/composables/useJWT'
import { useRouter } from 'vue-router';
const router = useRouter()

const { decodeToken } = useJWT()
const user = ref(decodeToken())

const randomUser = ref({})

async function handleGetRandomUser() {
  const { data } = await Api.get('/user/random')
  randomUser.value = {
    ...data,
    birthdate: new Date(data.birthdate).toLocaleString('default', { day: 'numeric', month: 'long' }),
    age: new Date().getFullYear() - new Date(data.birthdate).getFullYear()
  }
}

onBeforeMount(async () => {
  if (!user.value) router.push('/')
  await handleGetRandomUser()
})

</script>