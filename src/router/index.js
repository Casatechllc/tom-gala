import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import Success from '../views/Success.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/home',
      name: 'homeview',
      component: HomeView
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: () => import('../views/Gallery.vue')
    },
    {
      path: '/success',
      name: 'success',
      component: Success
    },
  ],
    scrollBehavior(to, from, savedPosition) {
         if (savedPosition) {
        return savedPosition;
    }
    if (to.hash) {
      return {
        el: to.hash,
        // behavior: 'smooth',
      };
    }
    return { top: 0 };
    },
})


export default router