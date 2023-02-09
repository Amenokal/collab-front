<template>
  <div class="layout">
    <NavBar/>

    <main>
      <section class="banner">
        <h1>Liste des collaborateurs</h1>
      </section>
      
      <section class="banner">
        <h2>Fitrer</h2>

        <div class="filter-container">
          <div class="input-wrapper">
            <label>Par nom :</label>
            <input type="text" v-model="nameFilter"/>
          </div>

          <div class="input-wrapper">
            <label>Marketing</label>
            <span @click="categoryFilter.marketing = !categoryFilter.marketing" class="marketing checkbox" :class="{'unselected': !categoryFilter.marketing}">
              <span>✔︎</span>
            </span>
            <input class="checkbox-hidden" type="checkbox"/>
          </div>
          
          <div class="input-wrapper">
            <label>Technique</label>
            <span @click="categoryFilter.technique = !categoryFilter.technique" class="technique checkbox" :class="{'unselected': !categoryFilter.technique}">
              <span>✔︎</span>
            </span>
            <input class="checkbox-hidden" type="checkbox"/>
          </div>
          
          <div class="input-wrapper">
            <label>Client</label>
            <span @click="categoryFilter.client = !categoryFilter.client" class="client checkbox" :class="{'unselected': !categoryFilter.client}">
              <span>✔︎</span>
            </span>
            <input class="checkbox-hidden" type="checkbox"/>
          </div>
        </div>
      </section>
      
      <section class="user-list-grid">
        <TransitionGroup name="cards"> 
          <div v-for="user in userList" :key="user.id" class="grid-item">
            <UserCard :user="user"/>
          </div>
        </TransitionGroup>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import NavBar from '@/components/NavBar.vue'
import UserCard from '@/components/UserCard.vue'
import { useUser } from '@/composables/useUser'

const { users } = await useUser()

const nameFilter = ref("")

const categoryFilter = ref({
  marketing: true,
  client: true,
  technique: true
})

const userList = computed(() => {
  let filtered = users.value.filter((user) => {
    return user.firstname.toLowerCase().includes(nameFilter.value.toLowerCase()) ||
          user.lastname.toLowerCase().includes(nameFilter.value.toLowerCase())
  })

  if(!categoryFilter.value.marketing) filtered = filtered.filter((user) => user.category !== "Marketing")
  if(!categoryFilter.value.technique) filtered = filtered.filter((user) => user.category !== "Technique")
  if(!categoryFilter.value.client)    filtered = filtered.filter((user) => user.category !== "Client")

  return filtered
})

</script>