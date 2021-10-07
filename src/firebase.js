import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAATaiC_MEikt3iPXM4uiRj2VIw83-Y-48",
    authDomain: "chat-app-1ef7a.firebaseapp.com",
    projectId: "chat-app-1ef7a",
    storageBucket: "chat-app-1ef7a.appspot.com",
    messagingSenderId: "1042268602954",
    appId: "1:1042268602954:web:aa72c2b0236d0d47521cb3",
    measurementId: "G-B017L9YWQR"
}

const app = firebase.initializeApp(firebaseConfig)

export const auth = app.auth()
export const db = app.firestore()
firebase.firestore().settings({ experimentalForceLongPolling: true })
export default app