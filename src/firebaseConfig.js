
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDl_r3NV18Gobu77uCDJmIAifK100sYv-g",
    authDomain: "mdz-store.firebaseapp.com",
    projectId: "mdz-store",
    storageBucket: "mdz-store.firebasestorage.app",
    messagingSenderId: "372850338263",
    appId: "1:372850338263:web:f58d36552355ee3ab88392",
    measurementId: "G-RE1ENT0N05"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);