<script setup>
import { useGlobal } from '../composables/global.js'
import { useRouter } from 'vue-router'
import { onMounted, ref, computed } from 'vue'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase.js'

// showDetails controlla se mostrare titolo+descrizione sotto ogni foto.
// Usato con false nella home (solo foto), true altrove se serve la versione completa
const props = defineProps({
  showDetails: {
    type: Boolean,
    default: true
  }
})

const global = useGlobal()
const router = useRouter()
const items = ref([]) // tutti gli item caricati da Firestore

// Ordine esatto e fisso delle 10 foto mostrate in home, tramite id specifico
// (non semplicemente le prime 10 trovate: questo elenco garantisce l'ordine voluto)
const DESIRED_ORDER = [
  'lapa-dos-brejoes-1',
  'cachoeira-do-funil',
  'toca-dos-ossos',
  'toca-da-barriguda-1',
  'gruta-do-convento',
  'caverna-do-bora-quatro-1',
  'gruta-lapa-doce',
  'lapa-do-bode',
  'toca-da-boa-vista',
  'lapa-do-penhasco-1',
]

// Ricostruisce l'elenco delle foto da mostrare seguendo l'ordine di DESIRED_ORDER,
// cercando ciascun id dentro gli item caricati; .filter(Boolean) scarta eventuali
// id non trovati (es. se un documento viene rimosso dal database)
const visibleItems = computed(() => {
  return DESIRED_ORDER
    .map((id) => items.value.find((item) => item.id === id))
    .filter(Boolean)
})

// Carica tutti gli item dalla collezione "items" di Firestore
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

// Cliccando una foto, naviga alla pagina di dettaglio di quella grotta
function goToDetail(itemId) {
  router.push({ name: 'itemDetail', params: { id: itemId } })
}

onMounted(loadItems)
</script>

<template>
  <section class="w-full">
    <!-- Nessuna foto ancora caricata: non mostra nulla (evita un flash di layout vuoto) -->
    <div v-if="visibleItems.length === 0" />

    <!-- Griglia "a mosaico": ogni foto ha una posizione (pos-0...pos-9) con
         dimensione e allineamento verticale specifici, definiti più sotto nel CSS -->
    <div v-else class="mosaic-grid">
      <article
        v-for="(item, index) in visibleItems"
        :key="item.id"
        class="mosaic-item"
        :class="'pos-' + index"
        @click="goToDetail(item.id)"
      >
        <figure class="mosaic-figure">
          <img
            v-if="item.imageUrl"
            :src="item.imageUrl"
            :alt="item.title || 'Item Image'"
            class="mosaic-img transition duration-300"
          />
        </figure>
        <!-- Titolo e descrizione: visibili solo quando showDetails è true -->
        <h3 v-if="showDetails" class="font-medium mt-2" style="color: #343434; transition: color 0.2s ease;" @mouseenter="$event.target.style.color = '#afafaf'" @mouseleave="$event.target.style.color = '#343434'">
          {{ item.title || item.id }}
        </h3>
        <p v-if="showDetails" class="mt-1 text-sm" style="color: #666666;">{{ item.description }}</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
h3:hover {
  color: #afafaf !important;
}

/* Griglia base: 5 colonne uguali, 2 righe. minmax(0, 1fr) invece di solo 1fr
   evita che le colonne "spingano" oltre il contenitore quando il contenuto è largo */
.mosaic-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  grid-template-rows: repeat(2, auto);
  column-gap: 10rem;
  row-gap: 3.5rem;
  align-items: start;
  width: 100%;
  box-sizing: border-box;
  padding-bottom: 6rem;
}

.mosaic-item {
  cursor: pointer;
  min-width: 0; /* permette alla colonna di restringersi sotto la larghezza naturale dell'immagine */
}

.mosaic-figure {
  margin: 0;
  min-width: 0;
}

.mosaic-img {
  display: block;
  width: 100%;
  max-width: 100%;
  object-fit: cover; /* ritaglia l'immagine per riempire lo spazio senza deformarla */
  border-radius: 0;
}

/* Ogni "pos-N" fissa la posizione nella griglia (colonna/riga) e il formato della foto:
   le posizioni pari sono verticali (184/212), le dispari orizzontali (184/139).
   Il margin-top alterna le foto per creare l'effetto "sfalsato" a mosaico */

/* Riga 1 */
.pos-0 { grid-column: 1; grid-row: 1; margin-top: 0; }
.pos-0 .mosaic-img { aspect-ratio: 184 / 212; }

.pos-1 { grid-column: 2; grid-row: 1; margin-top: 19.84%; }
.pos-1 .mosaic-img { aspect-ratio: 184 / 139; }

.pos-2 { grid-column: 3; grid-row: 1; margin-top: 0; }
.pos-2 .mosaic-img { aspect-ratio: 184 / 212; }

.pos-3 { grid-column: 4; grid-row: 1; margin-top: 19.84%; }
.pos-3 .mosaic-img { aspect-ratio: 184 / 139; }

.pos-4 { grid-column: 5; grid-row: 1; margin-top: 0; }
.pos-4 .mosaic-img { aspect-ratio: 184 / 212; }

/* Riga 2 */
.pos-5 { grid-column: 1; grid-row: 2; margin-top: 19.84%; }
.pos-5 .mosaic-img { aspect-ratio: 184 / 139; }

.pos-6 { grid-column: 2; grid-row: 2; margin-top: 0; }
.pos-6 .mosaic-img { aspect-ratio: 184 / 212; }

.pos-7 { grid-column: 3; grid-row: 2; margin-top: 19.84%; }
.pos-7 .mosaic-img { aspect-ratio: 184 / 139; }

.pos-8 { grid-column: 4; grid-row: 2; margin-top: 0; }
.pos-8 .mosaic-img { aspect-ratio: 184 / 212; }

.pos-9 { grid-column: 5; grid-row: 2; margin-top: 19.84%; }
.pos-9 .mosaic-img { aspect-ratio: 184 / 139; }
</style>