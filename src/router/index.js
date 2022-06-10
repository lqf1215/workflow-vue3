import { createRouter, createWebHistory } from 'vue-router'
const routerHistory = createWebHistory()
const router = createRouter({
  history: routerHistory,
  routes: [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/components/Generator/Main.vue')
      },
      // {
      //   path: '/h',
      //   component: HelloWorld
      // },
  ]
})
 
export default router;
