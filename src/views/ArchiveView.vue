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