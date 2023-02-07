<template>
  <nav class="navbar">
    <RouterLink to="/home">
      <img class="logo" src="@/assets/imgs/logo.png"/>
      <span v-if="user.isAdmin">ADMIN</span>
    </RouterLink>

    <div>
      <RouterLink v-if="user.isAdmin" class="link-wrapper" to="/users/create">
        <img class="icon create-user" src="@/assets/imgs/create-user.svg"/>
        <span class="link-text">Ajouter</span>
      </RouterLink>

      <RouterLink class="link-wrapper" to="/users">
        <img class="icon" src="@/assets/imgs/list.svg"/>
        <span class="link-text">Collaborateurs</span>
      </RouterLink>

      <RouterLink class="link-wrapper" to="" @click.prevent="handleLogout">
        <img class="icon logout-icon" src="@/assets/imgs/logout.svg"/>
        <span class="link-text">Déconnexion</span>
      </RouterLink>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { useRouter } from 'vue-router'
import { useJWT } from '@/composables/useJWT'
const router = useRouter()
const { decodeToken } = useJWT()
const user = ref(decodeToken())

async function handleLogout() {
  try { 
    const { logout } = useAuth()
    await logout()
    router.push('/')
  }
  catch(err) {
    console.error(err)
  }
}
</script>