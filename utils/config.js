import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    sendEmailVerification
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
    getFirestore,
    doc,
    setDoc,
    serverTimestamp,
    getDoc,
    addDoc,
    collection
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {
    getStorage,
    ref,
    uploadBytes ,
    getDownloadURL 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";



const firebaseConfig = {
    apiKey: "AIzaSyAQsN3IVqGs14gUiWosxvH42zETTR1Z4Oc",
    authDomain: "food-menu-4480f.firebaseapp.com",
    projectId: "food-menu-4480f",
    storageBucket: "food-menu-4480f.appspot.com",
    messagingSenderId: "138845162981",
    appId: "1:138845162981:web:d0c43ea7bf2bb0408c330c",
    measurementId: "G-ZGFNNH5QZ2"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app)

export {
    app,
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    doc,
    setDoc,
    db,
    serverTimestamp,
    getDoc,
    signOut,
    sendEmailVerification,
    storage,
    ref,
    uploadBytes,
    getDownloadURL,
    addDoc,
    collection
}