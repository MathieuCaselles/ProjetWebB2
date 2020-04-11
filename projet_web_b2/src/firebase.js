import firebase from 'firebase'
import 'firebase/firestore'

// firebase init goes here
const firebaseConfig = {
    apiKey: "AIzaSyAaWm68ifdLOhPqmgViq5ZxmbHbTPoSWxM",
    authDomain: "apprendrefirebase-c0e3f.firebaseapp.com",
    databaseURL: "https://apprendrefirebase-c0e3f.firebaseio.com",
    projectId: "apprendrefirebase-c0e3f",
    storageBucket: "apprendrefirebase-c0e3f.appspot.com",
    messagingSenderId: "686838103248",
    appId: "1:686838103248:web:227283517a28669211f2d5",
    measurementId: "G-4Z36VJSLH1"
};
firebase.initializeApp(firebaseConfig)

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser
const productsRef = db.collection("produits");
const messageRef = db.collection("messages")

// date issue fix according to firebase
const settings = {
    timestampsInSnapshots: true
}
db.settings(settings)

export {
    db,
    auth,
    currentUser,
    productsRef,
    messageRef
}
