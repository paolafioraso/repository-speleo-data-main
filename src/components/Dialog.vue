<script setup>
import { useGlobal } from '../composables/global.js'

// Stato globale condiviso: qui leggiamo global.dialog, un oggetto che
// altri componenti possono impostare per far comparire questo popup
// (es. global.dialog = { title, content, onOk, onCancel })
const global = useGlobal()

// Eseguita quando l'utente clicca "Ok"
async function handleOk() {
  try {
    // Se chi ha aperto il dialog ha passato una funzione onOk, la esegue
    // (es. confermare un'azione, eliminare qualcosa, ecc.)
    if (typeof global.dialog?.onOk === 'function') {
      await global.dialog.onOk()
    }
  } finally {
    // In ogni caso (successo o errore), chiude il dialog svuotando lo stato globale
    global.dialog = null
  }
}

// Eseguita quando l'utente clicca "Cancel"
async function handleCancel() {
  try {
    // Stessa logica di handleOk, ma per l'azione di annullamento
    if (typeof global.dialog?.onCancel === 'function') {
      await global.dialog.onCancel()
    }
  } finally {
    global.dialog = null
  }
}
</script>

<template>
  <!-- Il dialog è visibile solo se global.dialog.content è impostato da qualche parte nell'app -->
  <div
    v-if="global.dialog?.content != null"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4"
  >
    <!-- Riquadro bianco centrale del popup -->
    <div class="w-full max-w-[90vw] sm:max-w-[50vw] rounded-lg bg-white p-6 shadow-xl">
      <!-- Titolo opzionale: mostrato solo se è stato passato -->
      <h2
        v-if="global.dialog?.title"
        class="mb-2 text-xl font-semibold"
        style="color: #343434;"
      >
        {{ global.dialog.title }}
      </h2>

      <!-- Testo/contenuto principale del messaggio; whitespace-pre-line rispetta gli a capo manuali -->
      <p class="whitespace-pre-line" style="color: #666666;">
        {{ global.dialog.content }}
      </p>

      <!-- Pulsanti di azione: Cancel (annulla) e Ok (conferma) -->
      <div class="mt-6 flex justify-end gap-3">
        <button
          type="button"
          class="rounded-md border px-4 py-2 transition"
          style="border-color: #343434; background-color: transparent; color: #343434;"
          @mouseenter="$event.target.style.backgroundColor = '#343434'; $event.target.style.color = '#afafaf'"
          @mouseleave="$event.target.style.backgroundColor = 'transparent'; $event.target.style.color = '#343434'"
          @click="handleCancel"
        >
          Cancel
        </button>
        <button
          type="button"
          class="rounded-md px-4 py-2 transition"
          style="background-color: #343434; color: #afafaf;"
          @mouseenter="$event.target.style.backgroundColor = '#afafaf'; $event.target.style.color = '#343434'"
          @mouseleave="$event.target.style.backgroundColor = '#343434'; $event.target.style.color = '#afafaf'"
          @click="handleOk"
        >
          Ok
        </button>
      </div>
    </div>
  </div>
</template>