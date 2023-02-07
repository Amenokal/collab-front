<template>
  <div class="layout">
    <NavBar/>

    <main>
      <section class="banner">
        <h1>Liste des collaborateurs</h1>
        <div class="input-wrapper">
          <label>Fitrer</label>
          <input type="text" v-model="filter"/>
        </div>
      </section>
      
      <div class="user-list-grid">
        <TransitionGroup name="cards"> 
        <div v-for="user in userList" :key="user.id" class="grid-item">
            <UserCard :user="user"/>
          </div>
        </TransitionGroup>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import NavBar from '@/components/NavBar.vue'
import UserCard from '@/components/UserCard.vue'
import Api from '@/composables/useApi'

const users = ref([])

const filter = ref("")

const userList = computed(() => {
  return users.value.filter((user) => {
    return user.firstname.toLowerCase().includes(filter.value.toLowerCase()) ||
           user.lastname.toLowerCase().includes(filter.value.toLowerCase())
  })
})

try {
  const { data } = await Api.get('/user')
  users.value = data.map((user) => ({
    ...user,
    birthdate: new Date(user.birthdate).toLocaleString('default', { day: 'numeric', month: 'long' }),
    age: new Date().getFullYear() - new Date(user.birthdate).getFullYear()
  }))
}
catch(err) {
  console.error(err)
}
</script>