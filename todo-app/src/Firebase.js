
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
    apiKey: "AIzaSyAj6LLQgPFBhgdwFuxND7PEg1fbLD4Wn8Q",
    authDomain: "todo-app-ec459.firebaseapp.com",
    projectId: "todo-app-ec459",
    storageBucket: "todo-app-ec459.appspot.com",
    messagingSenderId: "254301958471",
    appId: "1:254301958471:web:799a3774f2ed8ad3a71c62",
    measurementId: "G-281PEC0CRJ"
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
 
