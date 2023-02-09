import { createRouter, createWebHistory } from 'vue-router'
import { useStorage } from '@/composables/useStorage'
import LoginPage from "../views/LoginView.vue"
import HomePage from "../views/HomeView.vue"
import UsersView from '../views/UsersView.vue'
import CreateUserView from '../views/CreateUserView.vue'
import ModifyUserView from '../views/ModifyUserView.vue'
import NotFound from '../views/404Page.vue'

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
  {
    path: '/users/create',
    name: 'CreateUser',
    component: CreateUserView,
    props: true
  },
  {
    path: '/users/:userId',
    name: 'ModifyUser',
    component: ModifyUserView,
    props: true
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

router.beforeEach((to) => {
  const { JWT } = useStorage()
  if(!JWT.value && to.path !== "/") router.push('/')
})

export default router
