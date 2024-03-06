import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import firebase from './components/firebase/Config.js'
import { firebaseApp, auth, firestore,collection,getDocs,query, where, storage } from './components/firebase/Config.js'; 

import { FirebaseContext } from './components/store/Context.jsx'
import Context from './components/store/Context.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{firebaseApp, auth, firestore, collection, getDocs,query, where, storage}}>
      <Context>
        <App />
      </Context>
    </FirebaseContext.Provider>
  </React.StrictMode>,
)
