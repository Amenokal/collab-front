<template>
  <h1>{{ title }}</h1>
  <form>
    <label>Civilité</label>
    <input type="text" v-model="form.gender"/>

    <label>Catégorie</label>
    <input type="text" v-model="form.category"/>

    <label>Nom</label>
    <input type="text" v-model="form.lastname"/>

    <label>Prénom</label>
    <input type="text" v-model="form.firstname"/>

    <label>Email</label>
    <input type="text" v-model="form.email"/>

    <label>Mot de passe</label>
    <input type="text" v-model="form.password"/>

    <label>Confirmation</label>
    <input type="text" v-model="form.confirm"/>

    <label>Téléphone</label>
    <input type="text" v-model="form.phone"/>

    <label>Date de naissance</label>
    <input type="text" v-model="form.birthdate"/>

    <label>Ville</label>
    <input type="text" v-model="form.city"/>

    <label>Pays</label>
    <input type="text" v-model="form.country"/>

    <label>Photo</label>
    <input type="text" v-model="form.photo"/>

    <button @click.prevent="handleSubmit">{{ button.text }}</button>

    <p v-if="error.value">{{ error }}</p>
  </form>
</template>

<script setup>
import { ref, defineProps } from 'vue'

const props = defineProps({
  title: String,
  button: String,
  handleFunction: Function
})

const form = ref({
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
  birthdate: null,
  isAdmin: false,
})

const error = ref('')

function handleSubmit() {
  error.value = ''
  for(const [key, value] of Object.entries(form.value)) {
    if(!value.trim()) {
      console.error(`Can't submit form, missing value for ${key}`)
      error.value = "Veuillez remplir tous les champs"
      break;
    }
  }
  return props.button.handle(form.value)
}
</script>