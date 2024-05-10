import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CatalogPage from '../views/CatalogPage.vue'
import GenerationPage from '../views/GenerationPage.vue'
import AdminPage from '../views/AdminViews/AdminPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/catalogPage',
      name: 'CatalogPage',
      component: CatalogPage
    },
    {
      path: '/generationPage',
      name: 'GenerationPage',
      component: GenerationPage
    },
    {
      path: '/adminPage',
      name: 'AdminPage',
      component: AdminPage
    },
  ]
})

export default router
