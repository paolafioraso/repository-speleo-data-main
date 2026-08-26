import { createRouter, createWebHistory } from 'vue-router'
import ArchiveView from '../views/ArchiveView.vue'
import DetailView from '../views/DetailView.vue'
import MapView from '../views/MapView.vue'
import InfoView from '../views/InfoView.vue'
import MapZoomView from '../views/MapZoomView.vue'  // ← Z maiuscola (corretto)

const routes = [
  {
    path: '/',
    name: 'home',
    component: ArchiveView
  },
  {
    path: '/items/:id',
    name: 'itemDetail',
    component: DetailView
  },
  {
    path: '/map',
    name: 'map',
    component: MapView
  },
  {
    path: '/map/zoom/:region',
    name: 'map-zoom',
    component: MapZoomView
  },
  {
    path: '/info',
    name: 'info',
    component: InfoView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router