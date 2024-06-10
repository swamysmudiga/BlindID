import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
/******* RK Credentials*******/
/*const firebaseConfig = {
    apiKey: "AIzaSyAta9ASohmhGFF5mjp42_xR_z57TXnnhOk",
    authDomain: "react-pics-storage.firebaseapp.com",
    projectId: "react-pics-storage",
    storageBucket: "react-pics-storage.appspot.com",
    messagingSenderId: "790364181126",
    appId: "1:790364181126:web:4e20a8a95677324ec97707",
    measurementId: "G-H3M4WW8Q06"
  };
*/
/******* Pavan Credentials*******/
  const firebaseConfig = {
    apiKey: "AIzaSyAsZ1fLcZoW8d4w61_GREyw7ghMxypRw9Q",
    authDomain: "blinkid-c7822.firebaseapp.com",
    projectId: "blinkid-c7822",
    storageBucket: "blinkid-c7822.appspot.com",
    messagingSenderId: "134585485474",
    appId: "1:134585485474:web:ee63220094467357546ffb",
    measurementId: "G-E1BEWZL2R8"
  };

const app = initializeApp(firebaseConfig);
const storage = getStorage(app); // Initialize storage

export { storage }; // Export storage
