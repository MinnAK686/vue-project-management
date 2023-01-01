import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Firebase Configuration
const firebaseConfig = {
    // Add firebase configuration
};

firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();
let serverTime = firebase.firestore.FieldValue.serverTimestamp();
let auth = firebase.auth();

export { db, serverTime, auth };
