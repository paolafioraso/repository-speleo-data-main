<script setup>
import { onMounted, ref } from 'vue'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase.js'
import { useRouter } from 'vue-router'

const mapContainer = ref(null) // riferimento al div dove Google Maps disegnerà la mappa
const router = useRouter()
const items = ref([]) // tutte le foto/grotte caricate da Firestore

// Carica tutti gli item, servono per calcolare quante grotte uniche mostrare nel pin
async function loadItems() {
  const snapshot = await getDocs(collection(db, 'items'))
  items.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

onMounted(async () => {
  await loadItems()

  // Carica lo script di Google Maps solo se non è già presente in pagina
  // (evita di ricaricarlo più volte se il componente viene rimontato)
  await new Promise((resolve) => {
    if (window.google?.maps) { resolve(); return }
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDrTk03BMuFIoMSlVnaivgygmVExhR8-10&libraries=marker&v=weekly`
    script.onload = resolve
    document.head.appendChild(script)
  })

  // Crea la mappa vera e propria: centrata per mostrare l'intero globo,
  // con tutti i controlli utente disattivati (niente zoom, drag, tastiera...)
  // dato che qui serve solo una mappa "statica" cliccabile sul pin
  const map = new google.maps.Map(mapContainer.value, {
    center: { lat: 10, lng: 18 },
    zoom: 2,
    minZoom: 2,
    maxZoom: 4,
    mapId: '139797c22725291764dc44a4', // collega lo stile personalizzato (Map_speleodata) creato su Google Cloud Console
    disableDefaultUI: true,
    gestureHandling: 'none',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    keyboardShortcuts: false,
    backgroundColor: 'white',
    // Impedisce di scorrere la mappa oltre certi limiti di latitudine,
    // così l'Antartide (in basso) resta sempre fuori vista
    restriction: {
      latLngBounds: {
        north: 85,
        south: -60,
        west: -180,
        east: 180,
      },
      strictBounds: true,
    },
  })

  // UN SOLO PIN, fisso al centro del Brasile, con il conteggio delle grotte uniche (non delle singole foto).
  // new Set(...) elimina i duplicati: se una grotta ha più foto con lo stesso "title",
  // viene contata una sola volta
  const uniqueCaveCount = new Set(items.value.map(item => item.title)).size

  // Crea l'elemento HTML del pin (un cerchio arancione con il numero dentro)
  const pin = document.createElement('div')
  pin.className = 'map-pin'
  pin.textContent = uniqueCaveCount

  // Posiziona il pin sulla mappa, alle coordinate approssimative del centro del Brasile
  const marker = new google.maps.marker.AdvancedMarkerElement({
    map,
    position: { lat: -14.2, lng: -51.9 },
    content: pin,
  })

  // Cliccando il pin, naviga alla mappa "zoomata" con i pin delle singole grotte
  marker.addListener('click', () => {
    router.push({ name: 'map-zoom', params: { region: 'brazil' } })
  })
})
</script>

<template>
  <div class="map-view">
    <!-- Contenitore dove Google Maps inietta la mappa via JavaScript (non gestito da Vue) -->
    <div ref="mapContainer" style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 0;" />

    <!-- Firma in basso, stesso stile usato in Archive/Info/Map Zoom -->
    <div class="map-footer">
      <p>Speleo_Archive</p>
      <p>Designed by Paola Fioraso</p>
    </div>
  </div>
</template>

<style>
/* Stile del pin: cerchio scuro con numero bianco, leggera ombra per profondità */
.map-pin {
  background-color: #343434;
  color: white;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Jura', sans-serif;
  font-weight: 700;
  font-size: 12px;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
}

.map-footer {
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

.map-footer p {
  margin: 0;
}
</style>