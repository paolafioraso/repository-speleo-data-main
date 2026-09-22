<script setup>
import { onMounted, provide } from 'vue'
import { createGlobalState, globalInjectionKey } from './composables/global.js'
import { useRoute } from 'vue-router'

import Auth from './components/Auth.vue'
import Dialog from './components/Dialog.vue'
import Loading from './components/Loading.vue'

// Crea l'oggetto di stato globale (loading, account, dialog...) e lo rende
// disponibile a TUTTI i componenti figli dell'app tramite provide/inject,
// senza doverlo passare manualmente pagina per pagina
const global = createGlobalState()
provide(globalInjectionKey, global)

// Sapere su quale pagina ci troviamo in ogni momento, per decidere
// cosa mostrare (nav sì/no, che tipo di layout usare, ecc.)
const route = useRoute()

onMounted(() => {})
</script>

<template>
  <!-- Overlay di caricamento globale: visibile ogni volta che global.loading > 0,
       cioè quando almeno un componente sta ancora recuperando dati da Firebase -->
  <Loading v-if="global.loading > 0" />

  <!-- Popup di conferma generico, riutilizzabile da qualsiasi componente
       tramite global.dialog (vedi Dialog.vue) -->
  <Dialog />

  <!-- Nav (Archive/Map/Info) e pulsante di login (Auth) nascosti
       nella pagina di dettaglio grotta e in Map Zoom, dove non servono
       o interferirebbero con il layout a schermo intero -->
  <template v-if="route.name !== 'itemDetail' && route.name !== 'map-zoom'">
    <nav style="position: fixed; top: 20px; left: 24px; z-index: 40; display: flex; align-items: center; gap: 2rem; font-family: 'Jura', sans-serif; font-weight: 700; font-size: 24px; background: transparent;">
      <!-- active-class="nav-active" schiarisce automaticamente la voce
           corrispondente alla pagina in cui ci si trova (vedi .nav-active sotto) -->
      <router-link :to="{ name: 'home' }" style="color: #343434; text-decoration: none;" active-class="nav-active">Archive</router-link>
      <router-link :to="{ name: 'map' }" style="color: #343434; text-decoration: none;" active-class="nav-active">Map</router-link>
      <router-link :to="{ name: 'info' }" style="color: #343434; text-decoration: none;" active-class="nav-active">Info</router-link>
    </nav>

    <div style="position: fixed; top: 0; right: 0; z-index: 40; padding: 2rem 2.5rem;">
      <Auth />
    </div>
  </template>

  <!-- Tre "contenitori" alternativi (<main>) a seconda della pagina corrente:
       ognuno ha un layout diverso, e solo uno alla volta è attivo -->

  <!-- 1) Map e Map Zoom: occupano tutto lo schermo, senza padding né margini -->
  <main v-if="route.name === 'map' || route.name === 'map-zoom'" style="position: fixed; inset: 0; z-index: 0;">
    <router-view />
  </main>
  <!-- 2) Archive (home): nessun padding qui, perché il margine sinistro/superiore
       è gestito interamente dentro HomeView.vue stessa -->
  <main v-else-if="route.name === 'home'" style="position: relative; z-index: 10; padding: 0;">
    <router-view />
  </main>
  <!-- 3) Tutte le altre pagine (Info, dettaglio grotta, ecc.): layout classico
       centrato, con larghezza massima e padding standard -->
  <main v-else style="max-width: 56rem; margin: 0 auto; padding: 5rem 2rem 2rem; position: relative; z-index: 10;">
    <router-view />
  </main>
</template>

<style>
/* Colore della voce di menu attiva (schiarito), applicato automaticamente
   da Vue Router quando active-class corrisponde alla pagina corrente */
.nav-active { color: #afafaf !important; }
</style>