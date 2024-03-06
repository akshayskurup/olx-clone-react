import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import { collection, getDocs,query, where } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyA7WPx_b5xFngtuje5PyNuWYstcWKXhzk4",
    authDomain: "fir-96a07.firebaseapp.com",
    projectId: "fir-96a07",
    storageBucket: "fir-96a07.appspot.com",
    messagingSenderId: "260443237961",
    appId: "1:260443237961:web:0c45aec5305abdab3c9998",
    measurementId: "G-3PE2RSJJ6J"
  };

  // const firebaseApp = firebase.initializeApp(firebaseConfig);

  // export default firebaseApp;
  const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebaseApp.auth();
const firestore = firebaseApp.firestore();
const storage = firebase.storage()

export { firebaseApp, auth, firestore,collection, getDocs,query, where, storage };
