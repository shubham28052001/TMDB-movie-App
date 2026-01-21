
import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const form = document.getElementById("loginForm");
const errorElement = document.querySelector(".error");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      errorElement.innerText = "Login successful!";
      errorElement.style.display = "block";
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 2000);
    })
    .catch((error) => {
      errorElement.innerText = "Invalid email or password";
      errorElement.style.display = "block";
      console.log(error);
      console.error("Invalid email or password");
    });
});
