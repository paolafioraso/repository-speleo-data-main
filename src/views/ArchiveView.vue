<script setup>
import ItemsList from '../components/ItemsList.vue'
</script>

<template>
  <div style="padding: 0 3rem 0 1.5rem; box-sizing: border-box; width: 100%; max-width: 100vw; overflow-x: hidden;">
    <div style="margin-top: 18vh; margin-bottom: 3rem;">
      <p style="font-family: 'Aeonik', sans-serif; font-size: 1.8rem; line-height: 1.4; color: #343434; margin: 0; padding: 0;">
        Visual catalog of <span style="color: #afafaf;">underground landscapes</span> documented during<br>
        the 2023 and 2025 expeditions to Brazil.
      </p>
    </div>

    <ItemsList :showDetails="false" />
  </div>
</template>