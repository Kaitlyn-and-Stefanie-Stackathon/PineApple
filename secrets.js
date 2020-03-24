import firebase from "firebase";
import firestore from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCNFYABpAGemHb26SufVb8U3wc1bDQE_mM",
  authDomain: "pineappleproject-b05f4.firebaseapp.com",
  databaseURL: "https://pineappleproject-b05f4.firebaseio.com",
  projectId: "pineappleproject-b05f4",
  storageBucket: "pineappleproject-b05f4.appspot.com",
  messagingSenderId: "1092741347333",
  appId: "1:1092741347333:web:6868d63bf9e7d6c0e5046c",
  measurementId: "G-RMYN67EE0K"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

module.exports = { firebaseApp, db, firebaseConfig };
