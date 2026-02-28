import { auth } from "./firebase.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const logoutBtn = document.querySelector(".btn")

logoutBtn.addEventListener("click", () => {

    signOut(auth).then(() => {
        window.location.href = "login.html"; 
    }).catch((error) => {
        console.log(error);
    });

});