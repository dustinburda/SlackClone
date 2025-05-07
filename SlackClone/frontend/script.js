import { login, signupRedirectHandler } from "./login.js";
import { signUp,loginRedirectHandler } from "./signup.js";
import { setActivePage } from "./globals.js";

setActivePage("login");

let loginButton = document.querySelector(".login-button");
loginButton.addEventListener("click", login);

let signupRedirectButton = document.querySelector(".signup-link");
signupRedirectButton.addEventListener("click", signupRedirectHandler)

// Attach Event Handlers here

let signupButton = document.querySelector('.signup-button');
signupButton.addEventListener("click", signUp);

let loginRedirectButton = document.querySelector(".signin-link");
loginRedirectButton.addEventListener("click", loginRedirectHandler);
