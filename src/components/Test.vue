<script setup>
import { useGlobal } from '../composables/global.js'

// Recupera l'intero stato globale condiviso dell'app (loading, account, dialog...)
const global = useGlobal()
</script>

<template>
  <!-- Componente di sola diagnostica/debug: mostra a schermo lo stato globale
       corrente in tempo reale, utile durante lo sviluppo per verificare
       cosa contiene "global" senza dover aprire la Console del browser -->
  <div class="w-full max-w-lg space-y-2 text-left text-sm">
    <h2 class="text-lg font-semibold" style="color: #343434;">Test component</h2>
    <!-- {{ global }} stampa l'oggetto reattivo così com'è, formattato automaticamente da Vue -->
    <pre style="color: #666666;">
      {{ global }}
    </pre>
  </div>
</template>