import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Register from '@/components/Register'
import Login from '@/components/Login'
import NewsfeedComp from '@/components/NewsfeedComp'
import UserView from '@/components/UserView.vue';
import Friends from '@/components/Friends.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/newsfeed',
    name: 'Newsfeed',
    component: NewsfeedComp
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/friends',
    name: 'Friends',
    component: Friends
  },
  {
    path: '/history',
    name: 'History',
    component: UserView
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
