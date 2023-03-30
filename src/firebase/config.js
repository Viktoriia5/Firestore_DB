import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBHRvphj59UaEEBxnDkD8xpsPu3agYsfoc",
  authDomain: "museum-collection-46591.firebaseapp.com",
  projectId: "museum-collection-46591",
  storageBucket: "museum-collection-46591.appspot.com",
  messagingSenderId: "333899641698",
  appId: "1:333899641698:web:170ad5ecea9af4f60db23b",
};

//init firebase
firebase.initializeApp(firebaseConfig);

//init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

export { projectFirestore, projectAuth };
