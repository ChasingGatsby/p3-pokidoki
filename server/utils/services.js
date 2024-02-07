// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyD2FNAWzqIHMoJJGhj1ALm-b83_K3zaNGY",

  authDomain: "pokidoki-1b3f0.firebaseapp.com",

  projectId: "pokidoki-1b3f0",

  storageBucket: "pokidoki-1b3f0.appspot.com",

  messagingSenderId: "424245549236",

  appId: "1:424245549236:web:f56b315cd77ee9d4551fe1",

  measurementId: "G-23SMBXSZJS"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);