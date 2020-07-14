import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDtG7QqW8_cOM2j-rfNfQoDyiiKmP24uxY",
    authDomain: "instagram-clone-874d9.firebaseapp.com",
    databaseURL: "https://instagram-clone-874d9.firebaseio.com",
    projectId: "instagram-clone-874d9",
    storageBucket: "instagram-clone-874d9.appspot.com",
    messagingSenderId: "394541916628",
    appId: "1:394541916628:web:48b4d51c34fc9109f97641",
    measurementId: "G-ZZVZZ6N48Y"
  })

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage};