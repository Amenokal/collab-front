<template>
  <div class="user-card">
    <div class="card-title" :class="cardColor">
      <img class="profile-img" :src="user.photo" />
    </div>

    <section class="card-content">
      <div class="text-content">
        <h3>{{ user.firstname }}</h3>
        <h2 class="uppercase">{{ user.lastname }}</h2>
        <span>Pôle {{ user.category }}</span>
      </div>

      <span class="splitter" />

      <div class="text-content">
        <p>{{ userAge }} ans</p>
        <p>{{ user.city }}</p>
        <p>{{ user.email }}</p>
        <p>{{ user.phone }}</p>
        <p>{{ userBirthDate }}</p>
      </div>

      <div v-if="loggedUser.isAdmin" class="btn-content">
        <button>
          <RouterLink :to="`/users/${user.id}`">Modifier</RouterLink>
        </button>
        <button @click="handleDeleteUser(user.id)">Supprimer</button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { useUser } from '@/composables/useUser'

const props = defineProps({ user: Object })
const { user: loggedUser } = await useAuth()
const { deleteUser } = await useUser()

const cardColor = computed(() => {
  if (!props.user || !props.user.category) return ""
  switch (props.user.category) {
    case "Marketing": return "blue";
    case "Client": return "orange";
    case "Technique": return "light-blue";
    default: return ""
  }
})

const userBirthDate = computed(() => {
  return new Date(props.user.birthdate).toLocaleString('default', { day: 'numeric', month: 'long' })
})

const userAge = computed(() => {
  return new Date().getFullYear() - new Date(props.user.birthdate).getFullYear()
})

async function handleDeleteUser(userId) {
  await deleteUser(userId)
}

</script>