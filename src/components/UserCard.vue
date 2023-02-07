<template>
  <div class="user-card">
    <div class="card-title" :class="cardColor">
      <img class="profile-img" :src="user.photo" />
    </div>
    
    <section class="card-content">
      <div class="text-content">
        <h3>{{ user.firstname }}</h3>
        <h2>{{ user.lastname.toUpperCase() }}</h2>
        <span>Pôle {{ user.category }}</span>
      </div>
      
      <span class="splitter" />
      
      <div class="text-content">
        <p>{{ user.age }} ans</p>
        <p>{{ user.city }}</p>
        <p>{{ user.email }}</p>
        <p>{{ user.phone }}</p>
        <p>{{ user.birthdate }}</p>
      </div>

      <div v-if="isAdmin" class="btn-content">
        <button @click="handleEditUser(user.id)">Modifier</button>
        <button @click="handleDeleteUser(user.id)">Supprimer</button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, defineProps } from 'vue'
import { useRouter } from 'vue-router'
import Api from '@/composables/useApi';
import { useJWT } from '@/composables/useJWT'
const { decodeToken } = useJWT()
const isAdmin = ref(decodeToken().isAdmin)
const router = useRouter()

const props = defineProps({
  user: Object
})

const cardColor = computed(() => {
  if(!props.user || !props.user.category) return ""
  switch(props.user.category) {
    case "Marketing": return "blue";
    case "Client": return "orange";
    case "Technique": return "light-blue";
    default: return ""
  }
})
function handleEditUser(userId) {
  router.push('/users/' + userId)
}

async function handleDeleteUser(userId) {
  try {
    await Api.del('/user/' + userId)
  }
  catch(err) {
    console.error(err)
  }
}

</script>