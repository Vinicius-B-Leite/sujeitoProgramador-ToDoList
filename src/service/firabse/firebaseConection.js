// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyAISTdTOFk0TG9vXn1kCC03y8gvOXJT8Hk",
  authDomain: "todolist-d1450.firebaseapp.com",
  databaseURL: "https://todolist-d1450-default-rtdb.firebaseio.com",
  projectId: "todolist-d1450",
  storageBucket: "todolist-d1450.appspot.com",
  messagingSenderId: "1049006281624",
  appId: "1:1049006281624:web:cdfd8f868298ad648211ed",
  measurementId: "G-BFV87VL5N4"
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);


export default firebase

