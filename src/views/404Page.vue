<template>
  <main class="error-layout">
    <h1 class="banner uppercase">Oups !</h1>
    <h2 class="banner">La page que vous cherchez n'existe pas</h2>
    <button @click="$router.back()">Retour</button>
  </main>
</template>

<style scoped>
main {
  height: 100vh;
  width: 100%;
  background: linear-gradient(180deg, rgb(33, 38, 60) 0%, rgb(55, 62, 77) 100%);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 13rem;
  padding-left: 10rem;
  box-sizing: border-box;
}
h1 {
  font-size: 6rem;
  color: white;
  letter-spacing: .5rem;
  font-weight: lighter;
}
h2 {
  color: white;
}
button {
  font-weight: bold;
  border: none;
  background: rgb(250,184,114);
  background: linear-gradient(140deg, rgba(250,184,114,1) 0%, rgba(255,217,142,1) 29%, rgba(250,128,114,1) 100%); 
  color: white;
  padding: .5rem 1rem;
  transition: .1s ease-out;
  margin-top: 2rem;
  box-sizing: border-box;
  border-radius: 3px;
  cursor: pointer;
}
</style>