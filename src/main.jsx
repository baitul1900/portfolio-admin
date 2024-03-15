import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "react-toastify/dist/ReactToastify.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import firebase from "firebase/compat/app";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxxclG_g4JMpyr7EsATWLsGapYh9NFwtQ",
  authDomain: "portfolio-39a41.firebaseapp.com",
  projectId: "portfolio-39a41",
  storageBucket: "portfolio-39a41.appspot.com",
  messagingSenderId: "389010646701",
  appId: "1:389010646701:web:c5bb8d7a5e4b7ab8020824",
  measurementId: "G-3E365B9S9B"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
