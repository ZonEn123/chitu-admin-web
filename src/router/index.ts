import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: { title: '登录' }
    },
    {
      path: '/',
      component: () => import('@/views/Layout.vue'),
      redirect: '/dashboard',
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import('@/views/Dashboard.vue'),
          meta: { title: '驾驶总览', requiresAuth: true }
        },
        {
          path: '/users',
          name: 'users',
          component: () => import('@/views/Users.vue'),
          meta: { title: '用户管理', requiresAuth: true }
        },
        {
          path: '/trips',
          name: 'trips',
          component: () => import('@/views/Trips.vue'),
          meta: { title: '行程管理', requiresAuth: true }
        },
        {
          path: '/reminders',
          name: 'reminders',
          component: () => import('@/views/Reminders.vue'),
          meta: { title: '提醒记录', requiresAuth: true }
        },
        {
          path: '/statistics',
          name: 'statistics',
          component: () => import('@/views/Statistics.vue'),
          meta: { title: '数据统计', requiresAuth: true }
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/dashboard'
    }
  ]
})

// 路由守卫：未登录跳转登录页
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router