import { createRouter, createWebHistory } from 'vue-router'

import ProfilePage from '@/components/shoppingApplication.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: ProfilePage // Set profile page as home route
  },
  
  {
    path: '/cartApplication',
    name: 'cartApp',
    component: ProfilePage,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('token');
      if (token) {
        next(); // Allow access if token exists
      } else {
        next('/login'); // Redirect to login page if token doesn't exist
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
