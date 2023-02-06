<template>
  <div class="home-box">
    <h1>Bienvenue sur l'intranet</h1>
    <p>
      La plate-forme de l'entreprise qui vous permet de retrouver vos
      collaborateurs.
    </p>
    <h1>Avez vous dit bonjour à:</h1>
    <div>
      <div class="box-home">
        <div>
          <img :src=photo />
        </div>
        <div>
          <h1>{{ firstname }} ({{age}}) ans</h1>
          <p>{{ city }}</p>
          <p>{{ email }}</p>
          <p>{{ telephone }}</p>
        </div>
      </div>
    </div>
    <button class="btn-other" @click="this.fetchData()">DIRE BONJOUR A QUELQU'UN D'AUTRE</button>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "HomePage",
  data() {
    return {
      photo : 'https://randomuser.me/api/portraits/men/40.jpg',
      urlAxios: 'k;',
      gender: "",
      firstname: "Quentin",
      city: "Paris, France",
      email: "quentin@gmail.com",
      telephone: "080829370923",
      birthday: "S",
      age: "36",
    };
  },
  methods: {
    fetchData() {
      axios.get('http://localhost:3000/user/random')
      .then((res)=> {
        console.log(res);
        this.gender = res.data.gender
        this.firstname = res.data.firstname
        this.city = res.data.city
        this.email = res.data.email
        this.telephone = res.data.phone
        this.photo = res.data.photo
        
        const date = new Date(res.data.birthdate);
        const currentYear = new Date().getFullYear();
        const numberOfYears = currentYear - date.getFullYear();
        this.age = numberOfYears
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
