<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useGlobal } from '../composables/global.js'
import { onMounted, ref } from 'vue'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase.js'

const route = useRoute()
const router = useRouter()
const global = useGlobal()
const item = ref(null)
const error = ref(null)

async function loadItem() {
	global.loading++
	try {
		const docRef = doc(db, 'items', route.params.id)
		const docSnap = await getDoc(docRef)
		if (docSnap.exists()) {
			item.value = { id: docSnap.id, ...docSnap.data() }
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

onMounted(loadItem)
</script>

<template>
	<div class="fixed inset-0 z-50 bg-white flex">
		<!-- X per chiudere in alto a destra sulla foto-->
		<button
			style="position: fixed; top: 1.5rem; right: 1.5rem; z-index: 60; background: none; border: none; cursor: pointer; font-size: 20px; color: #111; font-family: 'Jura', sans-serif; font-weight: 700;"
			@click="router.back()"
		>✕</button>

		<!-- Colonna sinistra -->
		<div class="w-1/3 flex flex-col justify-between overflow-y-auto" style="padding: 1.5rem 3rem 1.5rem 1.5rem;">
			<div>
				<!-- Titolo: Jura -->
				<h1 style="font-family: 'Jura', sans-serif; font-weight: 600; font-size: 1.5rem; margin-bottom: 1.5rem;">
					{{ item?.title }}
				</h1>
				<!-- Descrizione: Aeonik con larghezza controllata per andare a capo -->
				<p style="font-family: 'Aeonik', sans-serif; font-size: 1.02rem; line-height: 1.625; color: #404040; max-width: 280px; word-wrap: break-word; white-space: normal;">
					{{ item?.description }}
				</p>
			</div>

			<!-- Dati in basso a sinistra: Jura -->
			<div style="font-family: 'Jura', sans-serif; font-size: 0.75rem; color: #737373;" class="space-y-0.5">
				<p v-if="item?.location">LOCATION: {{ item.location }}</p>
				<p v-if="item?.date">DATE: {{ item.date }}</p>
				<p v-if="item?.observer">OBSERVER: {{ item.observer }}</p>
				<p v-if="item?.camera">CAMERA: {{ item.camera }}</p>
				<p v-if="item?.lens">LENS: {{ item.lens }}</p>
				<p v-if="item?.settings">SETTINGS: {{ item.settings }}</p>
				<p v-if="item?.model">MODEL: {{ item.model }}</p>
			</div>
		</div>

		<!-- Colonna destra: foto -->
		<div class="w-2/3 relative">
			<img
				v-if="item?.imageUrl"
				:src="item.imageUrl"
				:alt="item.title"
				class="w-full h-full object-cover"
			/>
		</div>
	</div>
</template>