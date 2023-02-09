<template>
  <div class="login-view">
    <form class="login-form">
      <img class="logo" src="@/assets/imgs/logo.png"/>

      <div class="input-wrapper">
        <label>EMAIL <span v-if="error">*</span></label>
        <input type="email" v-model="form.email"/>
      </div>
      
      <div class="input-wrapper">
        <label>MOT DE PASSE <span v-if="error">*</span></label>
        <input type="password" v-model="form.password"/>
      </div>

      <button @click.prevent="handleLogin">
        CONNEXION
        <img src="@/assets/imgs/arrow2.svg"/>
      </button>

      <p v-show="error" class="error-msg">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { useRouter } from 'vue-router';
const { login } = await useAuth()
const router = useRouter()

const form = ref({
  email: "",
  password: ""
})

const error = ref("")

async function handleLogin() {
  error.value = ""

  // form check
  for(const value of Object.values(form.value)) {
    if(!value.trim()) {
      return error.value = "Veuillez remplir tous les champs"
    }
  }

  // login request
  try {
    await login(form.value)
    router.push('/home')
  }
  catch (err) {
    error.value = "Identifiants invalides"
  }
}
</script>