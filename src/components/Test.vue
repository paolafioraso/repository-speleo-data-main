<script setup>
import { useGlobal } from '../composables/global.js'

const global = useGlobal()
</script>

<template>
  <div class="w-full max-w-lg space-y-2 text-left text-sm">
    <!-- Titolo: colore #343434 -->
    <h2 class="text-lg font-semibold" style="color: #343434;">Test component</h2>
    <!-- Contenuto pre: colore #343434 più chiaro -->
    <pre style="color: #666666;">
      {{ global }}
    </pre>
  </div>
</template>