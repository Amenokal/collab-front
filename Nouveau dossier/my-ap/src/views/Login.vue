<template>
  <div class="login">
    <h1>Connexion</h1>
    <p>
      Pour vous connecter à l'intranet, entrez votre identifiant et mot de
      passe.
    </p>
    <form class="form-login">
        <label>Email</label>
      <input type="email" v-model="email" />
          <label>Mot de passe</label>
      <input type="password" v-model="password" />
      <button @click.prevent="fetchData()" class="btn-other" >CONNEXION</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "LoginPage",
  data(){
    return {
        email: '',
        password: ''
    }
  },
  methods: {
    fetchData() {
        axios.post('http://localhost:3000/login', {email: this.email, password: this.password })
        .then((res)=> {
            console.log(res);
        })
        .catch((err)=> {
            console.log(err)
        })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
