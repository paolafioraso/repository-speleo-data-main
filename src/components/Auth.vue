<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
} from 'firebase/auth'
import { auth, googleProvider, ensureUserAccount, getAccountByUid } from '../firebase.js'

import { useGlobal } from '../composables/global.js'
const global = useGlobal() // stato globale condiviso in tutta l'app (es. loading, account utente)

// Contiene l'utente Firebase attualmente loggato (null se nessuno ha fatto login)
const user = ref(null)

// Funzione per "disiscriversi" dall'ascolto dei cambi di stato dell'autenticazione,
// verrà sovrascritta appena il listener viene creato in onMounted
let unsubscribeAuth = () => {}

onMounted(() => {

  // Ascolta in tempo reale i cambiamenti dello stato di login (login/logout/refresh pagina).
  // Firebase chiama questa funzione automaticamente ogni volta che lo stato cambia.
  unsubscribeAuth = onAuthStateChanged(auth, async (u) => {
    global.loading ++ // mostra lo spinner/caricamento globale mentre si verifica lo stato utente
    user.value = u
    if (!u) {
      // Nessun utente loggato: azzera l'account globale e chiudi il caricamento
      global.account = null
      global.loading --
      return
    }
    try {
      // Utente loggato: assicura che esista un documento "account" per lui in Firestore
      // (lo crea se è la prima volta), poi lo recupera per popolare lo stato globale
      await ensureUserAccount(u)
      global.account = await getAccountByUid(u.uid)
    } finally {
      global.loading --
    }
  })
})

onUnmounted(() => {
  // Ferma l'ascolto quando il componente viene distrutto, per evitare memory leak
  unsubscribeAuth()
})

// Avvia il login tramite popup di Google
async function connectWithGoogle() {
  try {
    const { user: firebaseUser } = await signInWithPopup(auth, googleProvider)
    await ensureUserAccount(firebaseUser)
  } catch (err) {
    const code = err?.code
    if (code === 'auth/popup-closed-by-user') {
      // L'utente ha chiuso il popup di Google senza completare il login: non è un vero errore,
      // quindi lo logghiamo solo come informazione, senza mostrare nulla come "errore" all'utente
      console.info('[accounts] Google sign-in cancelled (popup closed)')
      return
    }
    // Qualsiasi altro errore reale durante il login viene loggato in console per debug
    console.error('[accounts] connectWithGoogle failed', {
      code,
      message: err?.message,
      err,
    })
  }
}

// Effettua il logout dall'account Firebase corrente
async function logout() {
  await firebaseSignOut(auth)
}
</script>

<template>
  <header
    class="w-full"
  >
    <div class="mx-auto flex items-center justify-end gap-3">
      <!-- Nessun utente loggato: mostra il pulsante per accedere con Google -->
      <template v-if="!user">
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium shadow-sm transition focus:outline-none focus:ring-2 focus:ring-neutral-400"
          style="background-color: #343434; color: #afafaf;"
          @mouseenter="$event.target.style.backgroundColor = '#afafaf'; $event.target.style.color = '#343434'"
          @mouseleave="$event.target.style.backgroundColor = '#343434'; $event.target.style.color = '#afafaf'"
          @click="connectWithGoogle"
        >
          Connect with Google
        </button>
      </template>
      <!-- Utente loggato: mostra avatar, nome e pulsante di logout -->
      <template v-else>
        <div class="flex items-center gap-3">
          <img
            v-if="user.photoURL"
            :src="user.photoURL"
            :alt="user.displayName || 'User'"
            class="h-9 w-9 rounded-full object-cover ring-2 ring-neutral-200 dark:ring-neutral-700"
            referrerpolicy="no-referrer"
            width="36"
            height="36"
          />
          <span class="text-sm font-medium" style="color: #343434;">
            {{ user.displayName || user.email || 'User' }}
          </span>
          <button
            type="button"
            class="text-sm font-medium underline-offset-2 hover:underline"
            style="color: #afafaf;"
            @click="logout"
          >
            Logout
          </button>
        </div>
      </template>
    </div>
  </header>
</template>