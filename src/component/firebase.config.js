import { initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage"
// import { getFirestore } from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyBvf5x2fS3uDgtkbwnkdZcqSbbN70KHl2o",
  authDomain: "coffeemapafrica.firebaseapp.com",
  projectId: "coffeemapafrica",
  storageBucket: "coffeemapafrica.appspot.com",
  messagingSenderId: "293008535259",
  appId: "1:293008535259:web:2847841c282889153ce6fe",
  measurementId: "G-91FYKTZC3B",
}

// Initialize Firebase
const application = initializeApp(firebaseConfig)
export const imageUploadDB = getStorage(application)
