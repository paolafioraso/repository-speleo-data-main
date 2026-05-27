<script setup>
import { useGlobal } from '../composables/global.js'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase.js'

// Aggiunta prop per controllare se mostrare i dettagli
const props = defineProps({
  showDetails: {
    type: Boolean,
    default: true
  }
})

const global = useGlobal()
const router = useRouter()
const items = ref([])

async function loadItems() {
  global.loading++
  try {
    const snapshot = await getDocs(collection(db, 'items'))
    items.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  } finally {
    global.loading--
  }
}

function goToDetail(itemId) {
  router.push({ name: 'itemDetail', params: { id: itemId } })
}

onMounted(loadItems)
</script>

<template>
  <section class="w-full">
    <div v-if="items.length === 0" />

    <div v-else class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      <article
        v-for="item in items"
        :key="item.id"
        class="rounded-md bg-white cursor-pointer mb-4"
        @click="goToDetail(item.id)"
      >
        <figure>
          <img
            v-if="item.imageUrl"
            :src="item.imageUrl"
            :alt="item.title || 'Item Image'"
            class="h-80 w-full object-cover grayscale hover:grayscale-0 transition duration-300 rounded-md mb-2"
          />
        </figure>
        <!-- Titolo: visibile solo se showDetails è true -->
        <h3 v-if="showDetails" class="font-medium" style="color: #343434; transition: color 0.2s ease;" @mouseenter="$event.target.style.color = '#afafaf'" @mouseleave="$event.target.style.color = '#343434'">
          {{ item.title || item.id }}
        </h3>
        <!-- Descrizione: visibile solo se showDetails è true -->
        <p v-if="showDetails" class="mt-1 text-sm" style="color: #666666;">{{ item.description }}</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
h3:hover {
  color: #afafaf !important;
}
</style>