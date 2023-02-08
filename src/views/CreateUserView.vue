<template>
  <div class="layout">
    <NavBar />

    <main>
      <UserForm
        title="Créer un utilisateur"
        button="Créer"
        :user="emptyUser"
        :handle-function="handleCreateUser"
      />
    </main>
  </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
import UserForm from '@/components/UserForm.vue'
import { useUser } from '@/composables/useUser'

const emptyUser = {
  gender: "",
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  phone: "",
  city: "",
  country: "",
  photo: "",
  category: "",
  birthdate: "",
  isAdmin: false,
}

async function handleCreateUser(form) {
  const { createUser } = await useUser()
  await createUser(form)
}

</script>