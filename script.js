import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCrTRA1OqClyqoeF3qtdnH63QT3N9dh0Wg",
    authDomain: "project-c12c6.firebaseapp.com",
    projectId: "project-c12c6",
    storageBucket: "project-c12c6.firebasestorage.app",
    messagingSenderId: "403135006428",
    appId: "1:403135006428:web:96e95ea04d8fee9f159619"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

var user = document.getElementById("user");
var pass = document.getElementById("pass");
var button = document.getElementById("sign-in");

function getUser() {
    return user.value    
}
function getPass() {
    return pass.value
}

function signIn() {
    let user = getUser();
    let pass = getPass();
    signInWithEmailAndPassword(auth, user, pass)
        .then((userCredential) => {
            const user = userCredential.user;
            document.location.href = "graph.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });
}

function authSignOut() {
    signOut(auth).then(() => {
        showLoggedOutView();
    }).catch((error) => {
        console.error(error.message)
    });
}

function isLoggedIn() {
    let user = auth.currentUser;
    if(user) {
        return true;
    }
    return false;
}

button.addEventListener("click", signIn);

export { authSignOut, isLoggedIn }