
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyAHST8iwG_HMwRVIzKQZCyYHoenassQQvA",
  authDomain: "dataabm-60a53.firebaseapp.com",
  projectId: "dataabm-60a53",
  storageBucket: "dataabm-60a53.appspot.com",
  messagingSenderId: "294562889522",
  appId: "1:294562889522:web:003d32865a8772469fe12b",
  measurementId: "G-03SEB55LPH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export default db