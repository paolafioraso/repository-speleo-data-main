<script setup>
import ItemsList from '../components/ItemsList.vue'
</script>

<template>
  <div>
    <!-- Spazio superiore ridotto per spostare la scritta più in alto -->
    <div style="margin-top: 25vh; margin-bottom: 4rem;">
      <p style="font-family: 'Aeonik', sans-serif; font-size: 1.8rem; line-height: 1.4; color: #343434; margin: 0; padding: 0;">
        Visual catalog of <span style="color: #afafaf;">underground landscapes</span> documented during<br>
        the 2023 and 2025 expeditions to Brazil.
      </p>
    </div>
    
    <!-- Griglia degli item -->
    <ItemsList :showDetails="false" />
  </div>
</template>