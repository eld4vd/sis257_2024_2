//el index.ts del router del src, es el encargado de manejar las rutas de la aplicación en nestjs es como el app.module.ts

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/prueba',
      name: 'prueba',
      component: () => import('../views/PruebaView.vue')
    },
    {
      path: '/interpretes',
      name: 'interpretes',
      component: () => import('../views/InterpreteView.vue')
    },
    {
      path: '/canciones',
      name: 'canciones',
      component: () => import('../views/CancionView.vue')
    },
    {
      path: '/albumes',
      name: 'albumes',
      component: () => import('../views/AlbumView.vue')
    }
  ]
})

export default router
