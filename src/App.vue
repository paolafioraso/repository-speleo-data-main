<script setup>
import { onMounted, provide } from 'vue'
import { createGlobalState, globalInjectionKey } from './composables/global.js'
import { useRoute } from 'vue-router'

import Auth from './components/Auth.vue'
import Dialog from './components/Dialog.vue'
import Loading from './components/Loading.vue'

const global = createGlobalState()
provide(globalInjectionKey, global)

const route = useRoute()

onMounted(() => {})
</script>

<template>
  <Loading v-if="global.loading > 0" />
  <Dialog />

  <!-- Nav e Auth nascosti nella pagina dettaglio e in Map Zoom -->
  <template v-if="route.name !== 'itemDetail' && route.name !== 'map-zoom'">
    <nav style="position: fixed; top: 1.5rem; left: 1.5rem; z-index: 40; display: flex; align-items: center; gap: 2rem; font-family: 'Jura', sans-serif; font-weight: 700; font-size: 18px; background: transparent;">
      <router-link :to="{ name: 'home' }" style="color: #343434; text-decoration: none;" active-class="nav-active">Archive</router-link>
      <router-link :to="{ name: 'map' }" style="color: #343434; text-decoration: none;" active-class="nav-active">Map</router-link>
      <router-link :to="{ name: 'info' }" style="color: #343434; text-decoration: none;" active-class="nav-active">Info</router-link>
    </nav>

    <div style="position: fixed; top: 0; right: 0; z-index: 40; padding: 2rem 2.5rem;">
      <Auth />
    </div>
  </template>

  <main v-if="route.name === 'map' || route.name === 'map-zoom'" style="position: fixed; inset: 0; z-index: 0;">
    <router-view />
  </main>
  <!-- Condizione per la home: senza padding e max-width, allineata a sinistra -->
  <main v-else-if="route.name === 'home'" style="position: relative; z-index: 10; padding: 5rem 0 2rem 0; margin-left: 1.5rem;">
    <router-view />
  </main>
  <!-- Per tutte le altre pagine (info, itemDetail, ecc.) -->
  <main v-else style="max-width: 56rem; margin: 0 auto; padding: 5rem 2rem 2rem; position: relative; z-index: 10;">
    <router-view />
  </main>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Jura:wght@700&display=swap');
.nav-active { color: #afafaf !important; }
</style>