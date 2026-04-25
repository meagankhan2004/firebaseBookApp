import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth, signInAnonymously, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import firebaseConfig from './firebaseConfig.js';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function signIn() {
  signInAnonymously(auth).catch((error) => {
    console.log(error.code, error.message);
  });
}

function logout() {
  signOut(auth).catch((error) => {
    console.log(error);
  });
}

function setAuthListeners(loggedInFn, loggedOutFn) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      loggedInFn();
    } else {
      loggedOutFn();
    }
  });
}

export { signIn, logout, auth, setAuthListeners };
