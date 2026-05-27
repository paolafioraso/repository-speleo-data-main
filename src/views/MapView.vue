<script setup>

import { onMounted, ref } from 'vue'

import { collection, getDocs } from 'firebase/firestore'

import { db } from '../firebase.js'

import { useRouter } from 'vue-router'



const mapContainer = ref(null)

const router = useRouter()

const items = ref([])



async function loadItems() {

const snapshot = await getDocs(collection(db, 'items'))

items.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

}



onMounted(async () => {

await loadItems()



await new Promise((resolve) => {

if (window.google?.maps) { resolve(); return }

const script = document.createElement('script')

script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDrTk03BMuFIoMSlVnaivgygmVExhR8-10&libraries=marker&v=weekly`

script.onload = resolve

document.head.appendChild(script)

})



const map = new google.maps.Map(mapContainer.value, {

// Cambiamo il centro per spostare i continenti più in alto e a sinistra

center: { lat: 10, lng: 18 },

zoom: 2,

minZoom: 2,

maxZoom: 4, // Puoi limitare lo zoom massimo se non vuoi che vadano troppo nel dettaglio

mapId: '139797c22725291764dc44a4',

disableDefaultUI: true,

gestureHandling: 'none',

zoomControl: false,

scrollwheel: false,

disableDoubleClickZoom: true,

keyboardShortcuts: false,

backgroundColor: 'white',



// Questa opzione blocca la mappa ed evita che si veda l'Antartide in basso

restriction: {

latLngBounds: {

north: 85, // Blocca il Nord estremo

south: -60, // Taglia fuori l'Antartide (che si trova a circa -75/-90)

west: -180,

east: 180,

},

strictBounds: true,

},

})



// Cicliamo su tutti gli elementi del database

items.value.forEach((item) => {

// Verifica di sicurezza se l'elemento ha le coordinate

if (!item.coordinates?.latitude || !item.coordinates?.longitude) return



// Creiamo un elemento DOM unico per QUESTO marker

const pin = document.createElement('div')

pin.className = 'map-pin'


// Mostriamo un contenuto statico (es. "1" o un'icona)

// oppure omettiamo il testo per un look più pulito

pin.textContent = '10'



const marker = new google.maps.marker.AdvancedMarkerElement({

map,

position: {

lat: item.coordinates.latitude,

lng: item.coordinates.longitude

},

content: pin,

})



// Al click, navighiamo alla rotta passando magari l'ID dell'elemento

marker.addListener('click', () => {

router.push({ name: 'map-zoom', params: { region: 'brazil' } })

})

})

})

</script>



<template>

<div ref="mapContainer" style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 0;" />

</template>



<style>

.map-pin {

background-color: #E07B39;

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

box-shadow: 0 2px 6px rgba(0,0,0,0.15); /* Opzionale: aggiunge un filo di profondità */

}

</style> 

