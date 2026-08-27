<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useGlobal } from '../composables/global.js'
import { onMounted, ref, computed } from 'vue'
import { doc, getDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../firebase.js'

const route = useRoute()   // dà accesso ai parametri della URL corrente (es. l'id della grotta)
const router = useRouter() // permette di navigare via codice (es. tornare indietro)
const global = useGlobal() // stato globale condiviso (usato qui solo per il loading)

const item = ref(null)          // la grotta/foto attualmente mostrata in grande
const relatedItems = ref([])    // tutte le altre foto della stessa grotta (per le miniature)
const error = ref(null)         // messaggio di errore, se il caricamento fallisce

// Id delle foto con sfondo chiaro: qui la X deve essere scura (#343434) invece che bianca,
// altrimenti sparirebbe per mancanza di contrasto su una foto già chiara
const LIGHT_BACKGROUND_ITEMS = [
  'toca-dos-ossos',
]

// True se la foto attualmente mostrata è tra quelle con sfondo chiaro
const isLightBackground = computed(() => LIGHT_BACKGROUND_ITEMS.includes(item.value?.id))

// Converte del testo semplice in HTML "sicuro" (previene injection),
// usato prima di inserire la descrizione con v-html
function escapeHtml(text) {
	const div = document.createElement('div')
	div.textContent = text
	return div.innerHTML
}

function formatDescription(text) {
	if (!text) return ''
	return escapeHtml(text)
}

// Descrizione già "pulita", pronta per essere renderizzata nel template
const formattedDescription = computed(() => formatDescription(item.value?.description))

// Estrae il numero finale dall'id di una foto (es. "toca-da-barriguda-2" -> 2),
// usato per ordinare correttamente le miniature della stessa grotta
function extractPhotoNumber(id) {
	const match = id.match(/-(\d+)$/)
	return match ? parseInt(match[1], 10) : 0
}

// Carica la grotta corrente in base all'id nella URL, e recupera anche
// tutte le altre foto della stessa grotta (stesso "title") per le miniature
async function loadItem() {
	global.loading++
	try {
		const docRef = doc(db, 'items', route.params.id)
		const docSnap = await getDoc(docRef)
		if (docSnap.exists()) {
			const loadedItem = { id: docSnap.id, ...docSnap.data() }
			item.value = loadedItem

			// Cerca in Firestore tutti gli item con lo stesso titolo (stessa grotta),
			// per costruire la fila di miniature cliccabili sotto ai dati tecnici
			const q = query(collection(db, 'items'), where('title', '==', loadedItem.title))
			const snapshot = await getDocs(q)
			relatedItems.value = snapshot.docs
				.map((d) => ({ id: d.id, ...d.data() }))
				.sort((a, b) => extractPhotoNumber(a.id) - extractPhotoNumber(b.id)) // ordina 1, 2, 3...
		} else {
			error.value = 'Elemento non trovato'
		}
	} catch (err) {
		error.value = "Errore nel caricamento dell'elemento"
		console.error(err)
	} finally {
		global.loading--
	}
}

// Cliccando una miniatura, sostituisce la foto/dati mostrati in grande
// con quelli della foto selezionata, senza cambiare pagina/URL
function selectPhoto(photoItem) {
	item.value = photoItem
}

onMounted(loadItem)
</script>

<template>
	<div class="fixed inset-0 z-50 bg-white flex">
		<!-- Pulsante di chiusura: colore dinamico in base a isLightBackground,
		     per restare sempre leggibile sopra la foto -->
		<button
			:style="{
				position: 'fixed',
				top: '1.5rem',
				right: '1.5rem',
				zIndex: 60,
				background: 'none',
				border: 'none',
				cursor: 'pointer',
				fontSize: '30px',
				color: isLightBackground ? '#343434' : '#fff',
				fontFamily: 'Jura, sans-serif',
				fontWeight: 700
			}"
			@click="router.back()"
		>✕</button>

		<!-- Colonna sinistra: titolo, descrizione, dati tecnici, miniature. 24px dall'alto, 20px da sinistra, come le x posizionate a destra -->
		<div class="w-1/3 flex flex-col justify-between overflow-y-auto" style="padding: 24px 3rem 2rem 20px;">
			<div>
				<h1
					style="font-family: 'Jura', sans-serif; font-weight: 600; font-size: 32px; letter-spacing: 0.02em; margin: 0 0 2rem 0; white-space: nowrap; display: inline-block;"
				>
					{{ item?.title }}
				</h1>
				<p
					v-html="formattedDescription"
					style="font-family: 'Aeonik', sans-serif; font-size: 16px; line-height: 1.2; color: #262626; margin: 0; word-wrap: break-word; max-width: 290px;"
				></p>
			</div>

			<div>
				<!-- Metadati tecnici della foto: mostrati solo se il campo esiste nel database (v-if) -->
				<div style="font-family: 'Jura', sans-serif; font-size: 0.7rem; letter-spacing: 0.03em; color: #737373; line-height: 1.6;">
					<p v-if="item?.location" style="margin: 0;">LOCATION: {{ item.location }}</p>
					<p v-if="item?.date" style="margin: 0;">DATE: {{ item.date }}</p>
					<p v-if="item?.observer" style="margin: 0;">OBSERVER: {{ item.observer }}</p>
					<p v-if="item?.camera" style="margin: 0;">CAMERA: {{ item.camera }}</p>
					<p v-if="item?.lens" style="margin: 0;">LENS: {{ item.lens }}</p>
					<p v-if="item?.settings" style="margin: 0;">SETTINGS: {{ item.settings }}</p>
					<p v-if="item?.model" style="margin: 0;">MODEL: {{ item.model }}</p>
				</div>

				<!-- Fila di miniature: appare solo se la grotta ha più di una foto.
				     Opacità piena sulla foto attiva, ridotta sulle altre, piena in hover -->
				<div v-if="relatedItems.length > 1" style="display: flex; gap: 0.5rem; margin-top: 1.25rem;">
					<img
						v-for="photo in relatedItems"
						:key="photo.id"
						:src="photo.imageUrl"
						:alt="photo.title"
						@click="selectPhoto(photo)"
						@mouseenter="$event.target.style.opacity = '1'"
						@mouseleave="$event.target.style.opacity = (photo.id === item?.id ? '1' : '0.3')"
						:style="{
							width: '56px',
							height: '56px',
							objectFit: 'cover',
							cursor: 'pointer',
							opacity: photo.id === item?.id ? '1' : '0.3',
							transition: 'opacity 0.2s ease'
						}"
					/>
				</div>
			</div>
		</div>

		<!-- Colonna destra: la foto grande, a piena altezza -->
		<div class="w-2/3 relative bg-neutral-100">
			<img
				v-if="item?.imageUrl"
				:src="item.imageUrl"
				:alt="item.title"
				class="w-full h-full object-cover"
			/>
		</div>
	</div>
</template>

<style>
</style>