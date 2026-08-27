<script setup>
import ItemsList from '../components/ItemsList.vue'
</script>

<template>
  <div style="padding: 0 50px 0 50px; box-sizing: border-box; width: 100%; max-width: 100vw; overflow-x: hidden;">
    <p style="font-family: 'Aeonik', sans-serif; font-size: 24px; line-height: 1.2; color: #343434; margin: 272px 0 3rem 0; padding: 0; max-width: 620px;">
      Visual catalog of <span style="color: #afafaf;">underground landscapes</span> documented during the 2023 and 2025 expeditions to Brazil.
    </p>

    <ItemsList :showDetails="false" />

    <div class="archive-footer">
      <p>Speleo_Archive</p>
      <p>Designed by Paola Fioraso</p>
    </div>
  </div>
</template>

<style scoped>
.archive-footer {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  text-align: center;
  font-family: 'Jura', sans-serif;
  font-size: 0.7rem;
  letter-spacing: 0.03em;
  color: #a3a3a3;
  line-height: 1.6;
}

.archive-footer p {
  margin: 0;
}
</style>