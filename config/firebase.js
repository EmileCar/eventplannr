import { initializeApp } from "firebase/app";
import { getAuth } from "@firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCGozKyPWH12DomOtXjzqA5Fd2OmFZPpHM",
  authDomain: "eventplannr-7dd64.firebaseapp.com",
  projectId: "eventplannr-7dd64",
  storageBucket: "eventplannr-7dd64.appspot.com",
  messagingSenderId: "1008384544350",
  appId: "1:1008384544350:web:fe62e095e3280ae2a92ecf",
  measurementId: "G-HHPBTBEYTN"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;