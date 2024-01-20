import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '@/views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/views/HomePage.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginPage.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/RegisterPage.vue')
  },
  {
    path: '/pin',
    name: 'Pin',
    component: () => import('@/views/PinPage.vue')
  },
  {
    path: '/reset',
    name: 'Reset',
    component: () => import('@/views/ResetPage.vue')
  },
  {
    path: '/dashboard/',
    component: TabsPage,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('@/views/DashboardPage.vue')
      },
      {
        path: '/menu/:key',
        name: 'MenuDetail',
        component: () => import('@/views/MenuPage.vue')
      },
      {
        path: '/profile',
        name: 'Profile',
        component: () => import('@/views/ProfilePage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
