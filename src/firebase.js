import firebase from "firebase/app";
import 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCTbdcVh-XiO8qDf-bd_TnR1A9t4V0anhQ",
    authDomain: "crud-reactjs-1a2e3.firebaseapp.com",
    projectId: "crud-reactjs-1a2e3",
    storageBucket: "crud-reactjs-1a2e3.appspot.com",
    messagingSenderId: "1064364877168",
    appId: "1:1064364877168:web:d9f313f1e577b2f9c05bb5"
};
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export {firebase}