<script setup>
import ItemDetail from '../components/ItemDetail.vue'
</script>

<template>
  <!-- Semplice "wrapper" di pagina: la vera logica (caricamento dati, titolo,
       descrizione, foto, miniature, ecc.) vive interamente dentro il componente
       ItemDetail.vue. Questo file esiste solo perché il router ha bisogno di
       una "view" (pagina) a cui associare la route, che qui si limita a
       includere il componente vero e proprio -->
  <div class="detail-view">
    <ItemDetail />
  </div>
</template>

<style scoped>
.detail-view {
  width: 100%;
}
</style>