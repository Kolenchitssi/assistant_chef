// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA87Bekc0JA2JbL4CyhFMzGXziI6cvCN98',
  authDomain: 'assistant-chef-e6598.firebaseapp.com',
  projectId: 'assistant-chef-e6598',
  storageBucket: 'assistant-chef-e6598.firebasestorage.app',
  messagingSenderId: '1094882867141',
  appId: '1:1094882867141:web:e261ce12f56472cc223dac',
  measurementId: 'G-ZRDSSNGNSC',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const analytics = getAnalytics(app); // may be need later

export { auth };
