// https://vuefire.vuejs.org/vuefire/getting-started.html

import firebase from "firebase";
import FirebaseConfig from "./config/firebase";

// Get a Firestore instance
export const db = firebase
  .initializeApp(FirebaseConfig)
  .firestore();
