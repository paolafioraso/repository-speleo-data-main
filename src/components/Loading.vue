<template>
  <!-- Overlay a schermo intero mostrato mentre global.loading è maggiore di 0
       (vedi App.vue: <Loading v-if="global.loading > 0" />) -->
  <div class="flex items-center justify-center w-screen h-screen z-10">
    <!-- Icona a forma di anello, ruotata di continuo tramite la classe "animate-spin" -->
    <svg
      class="animate-spin h-8 w-8 text-gray-600"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <!-- Cerchio di sfondo, semi-trasparente, dà la "traccia" statica dell'anello -->
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <!-- Arco più opaco che, ruotando insieme all'intero SVG, crea l'effetto di caricamento -->
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    <span class="ml-2 text-gray-600">Loading...</span>
  </div>
</template>