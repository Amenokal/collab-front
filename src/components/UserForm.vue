<template>
  <div class="banner">
    <h1>{{ title }}</h1>
  </div>

  <form v-if="props.user">
    <div class="input-wrapper">
      <label>Civilité</label>
      <select id="gender-select" v-model="form.gender">
        <option v-for="option in genderOptions" :key="option.id" :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>

    <div class="input-wrapper">
      <label>Catégorie</label>
      <select id="category-select" v-model="form.category">
        <option v-for="option in categoryOptions" :key="option.id" :value="option">
          {{ option }}
        </option>
      </select>
    </div>

    <div class="input-wrapper">
      <label>Nom</label>
      <input type="text" v-model="form.lastname" />
    </div>

    <div class="input-wrapper">
      <label>Prénom</label>
      <input type="text" v-model="form.firstname" />
    </div>

    <div class="input-wrapper">
      <label>Email</label>
      <input type="text" v-model="form.email" />
    </div>

    <!-- <div class="input-wrapper">
      <label>Mot de passe</label>
      <input type="text" v-model="form.password" />
    </div>

    <div class="input-wrapper">
      <label>Confirmation</label>
      <input type="text" v-model="form.confirm" />
    </div> -->

    <div class="input-wrapper">
      <label>Téléphone</label>
      <input type="text" v-model="form.phone" />
    </div>

    <div class="input-wrapper">
      <label>Date de naissance</label>
      <input type="date" v-model="form.birthdate" />
    </div>

    <div class="input-wrapper">
      <label>Ville</label>
      <input type="text" v-model="form.city" />
    </div>

    <div class="input-wrapper">
      <label>Pays</label>
      <input type="text" v-model="form.country" />
    </div>

    <div class="input-wrapper">
      <label>Photo</label>
      <input type="text" v-model="form.photo" />
    </div>
    <button @click.prevent="handleSubmit">{{ button }}</button>

    <p v-if="error.value">{{ error }}</p>
  </form>
</template>

<script setup>
import { ref, defineProps } from 'vue'

const props = defineProps({
  title: String,
  button: String,
  user: Object,
  handleFunction: Function
})

const form = ref({
  gender: props.user.gender,
  firstname: props.user.firstname,
  lastname: props.user.lastname,
  email: props.user.email,
  password: props.user.password,
  phone: props.user.phone,
  city: props.user.city,
  country: props.user.country,
  photo: props.user.photo,
  category: props.user.category,
  birthdate: props.user.birthdate,
  isAdmin: props.user.isAdmin,
})

const genderOptions = [
  { label: "M", value: "male" },
  { label: "F", value: "female" },
  { label: "Autre", value: "other" },
]

const categoryOptions = [
  "Marketing",
  "Technique",
  "Client"
]

const error = ref('')

function handleSubmit() {
  error.value = ''
  const data = props.user
  for(const [key, value] of Object.entries(form.value)) {
    if(value) {
      data[key] = value
    }
  }
  return props.handleFunction(data)
}
</script>