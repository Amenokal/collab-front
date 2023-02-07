<template>
  <div class="home-view">
    <NavBar />

    <main>
      <section>
        <h1>Bienvenue, {{ user.firstname }} !</h1>
      </section>

      <section>
        <div class="img-wrapper">
          <img :src="randomUser.photo" />
        </div>
        <h2>{{ randomUser.firstname }} - {{ randomUser.age }} ans</h2>
      </section>
      <section>
        <p>{{ randomUser.city }}</p>
          <p>{{ randomUser.email }}</p>
          <p>{{ randomUser.phone }}</p>
          <p>{{ randomUser.birthdate }}</p>
      </section>
      <button class="btn-other" @click="handleGetRandomUser">DIRE BONJOUR A QUELQU'UN D'AUTRE</button>
    </main>
  </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'

import { ref, onBeforeMount } from 'vue'
import Api from '@/composables/useApi'
import { useJWT } from '@/composables/useJWT'
import { useRouter } from 'vue-router';
const { decodeToken } = useJWT()
const router = useRouter()

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

<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

img {
  border-radius: 100%;
}
</style>
