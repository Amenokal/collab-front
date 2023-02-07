import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from "../views/LoginView.vue"
import HomePage from "../views/HomeView.vue"
import UsersView from '../views/UsersView.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/users',
    name: 'Users',
    component: UsersView
  },
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

export default router
