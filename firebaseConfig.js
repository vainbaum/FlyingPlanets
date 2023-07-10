import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
// import  from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyApsC9bRcWGung9P2ktjjRnVS34YOe1eAs',
  authDomain: 'project-id.firebaseapp.com',
  databaseURL: 'https://flyingplanets-b3639-default-rtdb.firebaseio.com',
  projectId: 'project-id',
  storageBucket: 'project-id.appspot.com',
  messagingSenderId: 'sender-id',
  appId: 'app-id',
  measurementId: 'G-measurement-id',
};

const app = initializeApp(firebaseConfig);