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
import { defineProps } from 'vue'
import NavBar from '@/components/NavBar.vue'
import UserForm from '@/components/UserForm.vue'
import { useUser } from '@/composables/useUser'
const { getUser, updateUser } = await useUser()

const props = defineProps({userId: String})
const user = getUser(props.userId)

async function handleUpdateUser(form) {
  await updateUser(props.userId, form)
}
</script>