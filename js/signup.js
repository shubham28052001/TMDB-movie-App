import { auth, db } from "./firebase.js";
import { createUserWithEmailAndPassword } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { doc, setDoc } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const form = document.getElementById("signupForm");
const errorElement = document.querySelector(".error");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", userCred.user.uid), {
      name: name,
      email: email,
      createdAt: new Date()
    });

    errorElement.innerText = "Signup successful!";
    errorElement.style.display = "block";
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 2000);
  } catch (err) {
    if (err.code === 'auth/email-already-in-use') {
      errorElement.innerText = "This email is already registered.";
      errorElement.style.display = "block";
    } else if (err.code === 'auth/weak-password') {
      errorElement.innerText = "Password should be at least 6 characters.";
      errorElement.style.display = "block";
    } else {
      errorElement.innerText = "Error during signup. Please try again.";
      errorElement.style.display = "block";

    }
    console.log(err.message);
  }
});
