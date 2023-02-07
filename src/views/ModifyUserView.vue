<template>
  <div class="layout">
    <NavBar />

    <main>
      <UserForm
        :title="'Modifier un utilisateur'"
        :user="user"
        :button="'Valider'"
        :handle-function="handleUpdateUser"
      />
    </main>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'
import NavBar from '@/components/NavBar.vue'
import UserForm from '@/components/UserForm.vue'
import Api from '@/composables/useApi'

const props = defineProps({
  userId: String
})

const user = ref(null)

try {
  const { data } = await Api.get('/user/' + props.userId)
  user.value = data
}
catch(err) {
  console.error(err)
}

async function handleUpdateUser(form) {
  try {
    const res = await Api.put('/user/' + props.userId, form)
    console.info(res)
  }
  catch(err) {
    console.error(err)
  }
}
</script>