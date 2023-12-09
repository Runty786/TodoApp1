// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCDy0UicH_ZigUGHSAjvp6wPmjJdlAUspI",
    authDomain: "inootbook.firebaseapp.com",
    projectId: "inootbook",
    storageBucket: "inootbook.appspot.com",
    messagingSenderId: "1046613738978",
    appId: "1:1046613738978:web:209c1963daf6bb208725bb",
    measurementId: "G-0WB6MB19D8",
})
const db = firebaseApp.firestore();

export default db;  
 
