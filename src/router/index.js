import { createRouter, createWebHistory } from 'vue-router'
import LayoutPage from '@/views/layout/index.vue'
import HomePage from '@/views/home/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: LayoutPage,
      redirect: '/home',
      children: [
        { path: '/home', component: HomePage },
        {
          path: '/category',
          component: () => import('@/views/category/index.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue')
    }
  ]
})

export default router
