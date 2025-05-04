import { loginUrl } from "./env.js";

let loginPage = document.querySelector(".login-page")
let welcomePage = document.querySelector(".welcome-page")

// loginPage.classList.remove("hidden")

let loginButton = document.querySelector(".login-button");

async function login() {
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;

    try {
        const response = await fetch(loginUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }); 

        console.log(response);
    } 
    catch (e) {
        console.log("Failed to log in!")
    }
}

loginButton.addEventListener("click", login);

