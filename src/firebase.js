import firebase from 'firebase/app';
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyD0EZss96AuQPYMKVn8fjx42KrzF-uQd7M",
    authDomain: "inventario-crud.firebaseapp.com",
    projectId: "inventario-crud",
    storageBucket: "inventario-crud.appspot.com",
    messagingSenderId: "752856831036",
    appId: "1:752856831036:web:828f360c217a927f071f39",
    measurementId: "G-MXRMRLJWKR"
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore()
// firebase.analytics();
