import { login, signupRedirectHandler } from "./login.js";
import { setActivePage } from "./globals.js";

setActivePage("login");

let loginButton = document.querySelector(".login-button");
loginButton.addEventListener("click", login);

let signupButtonRedirectButton = document.querySelector(".signup-link");
signupButtonRedirectButton.addEventListener("click", signupRedirectHandler)


