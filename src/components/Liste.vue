<template>
  <div class="home-box">
    <ul v-if="array.length > 0">
      <li v-for="value in array" :key="value.id">Nom: {{ value.firstname }}</li>
    </ul>

    <div  v-for="value in array" :key="value.id">
      <section>
        <div class="img-wrapper">
          <img :src="value.photo" circle />
        </div>
        <h2>{{ value.firstname }} - {{ value.age }} ans</h2>
      </section>
      <section>
        <p>{{ value.city }}</p>
        <p>{{ value.email }}</p>
        <p>{{ value.phone }}</p>
        <p>{{ value.birthdate }}</p>
      </section>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ListePage",
  data() {
    return {
      array: [],
    };
  },
  created() {
    this.showList();
  },
  methods: {
    showList() {
      axios.get("http://localhost:3000/user").then((res) => {
        console.log(res);
        res.data.forEach((el) => {
          this.array.push(el);
          console.log(this.array);
        });
        // console.log(typeof res.data);
        // this.array = res.data;
        // console.log("this.array", this.array);
        // console.log("this.array tab", Array.from(this.array));
        // console.log(typeof this.array);
      });
    },
  },
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
