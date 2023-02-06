import HomePage from "../src/views/Home.vue";
import LoginPage from "../src/views/Login.vue";
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

export default router
