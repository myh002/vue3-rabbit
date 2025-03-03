import { createRouter, createWebHistory } from 'vue-router'
import LayoutPage from '@/views/layout/index.vue'
import HomePage from '@/views/home/index.vue'

import Member from '@/views/member/index.vue'
import UserInfo from '@/views/member/components/UserInfo.vue'
import UserOrder from '@/views/member/components/UserOrder.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: LayoutPage,
      children: [
        { path: '/', component: HomePage },
        {
          path: '/category/:id',
          component: () => import('@/views/category/index.vue')
        },
        {
          path: '/category/sub/:id',
          component: () => import('@/views/subcategory/index.vue')
        },
        {
          path: '/detail/:id',
          component: () => import('@/views/detail/index.vue')
        },
        {
          path: '/cartlist',
          component: () => import('@/views/cartlist/index.vue')
        },
        {
          path: '/checkout',
          component: () => import('@/views/checkout/index.vue')
        },
        {
          path: '/pay',
          component: () => import('@/views/pay/index.vue')
        },
        {
          path: 'paycallback',
          component: import('@/views/pay/PayBack.vue')
        },
        {
          path: 'member',
          component: Member,
          redirect: 'member/user',
          children: [
            {
              path: 'user',
              component: UserInfo
            },
            {
              path: 'order',
              component: UserOrder
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue')
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
