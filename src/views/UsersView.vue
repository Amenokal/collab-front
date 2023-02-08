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
import { useUser } from '@/composables/useUser'

const { users } = await useUser()

const filter = ref("")

const userList = computed(() => {
  const filtr = filter.value.toLowerCase()
  return filtr
    ? users.value.filter((user) => {
      user.firstname.toLowerCase().includes(filtr) || user.lastname.toLowerCase().includes(filtr)
    })
    : users.value
})
</script>