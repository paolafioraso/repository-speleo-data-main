import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAFAGfG2duEQRjOmvC7SQszoSQlHzj7iAY",
  authDomain: "speleo-data.firebaseapp.com",
  projectId: "speleo-data",
  storageBucket: "speleo-data.firebasestorage.app",
  messagingSenderId: "201248027288",
  appId: "1:201248027288:web:7435d7492648d30fd4d6ed",
  measurementId: "G-7DMPMMHML1"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const googleProvider = new GoogleAuthProvider()

export const analytics =
  typeof window !== 'undefined' ? getAnalytics(app) : null

const ACCOUNTS = 'accounts'
const LOG = '[accounts]'

export async function ensureUserAccount(user) {
  if (!user?.uid) {
    console.warn(`${LOG} ensureUserAccount skipped: missing user.uid`)
    return false
  }

  const ref = doc(db, ACCOUNTS, user.uid)
  const name = user.displayName ?? ''
  const email = user.email ?? ''

  try {
    await user.getIdToken(true) // forza refresh del token
    await setDoc(ref, { uid: user.uid, name, email, roles: [] }, { merge: true })
    console.info(`${LOG} document saved`, { uid: user.uid })
    return true
  } catch (err) {
    console.error(`${LOG} setDoc failed`, err)
    return false
  }
}

export async function getAccountByUid(uid) {
  if (!uid) return null
  const ref = doc(db, ACCOUNTS, uid)
  const snap = await getDoc(ref)
  if (!snap.exists()) return null
  return { id: snap.id, ...snap.data() }
}