import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDdcSmMevgI7aLM5i3Ls1Oe7cq1kTrl1QY",
    authDomain: "react-auth-dd1f3.firebaseapp.com",
    projectId: "react-auth-dd1f3",
    storageBucket: "react-auth-dd1f3.appspot.com",
    messagingSenderId: "289707748744",
    appId: "1:289707748744:web:be6785629655b0fe819e3d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);