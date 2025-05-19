import { loginUrl } from "./env.js";
import { setActivePage } from "./globals.js";

function loginError() {
    let loginSubtitle = document.querySelector('.login-card-subtitle');

    
    loginSubtitle.textContent = "Error, could not login!"
    loginSubtitle.style.color = "red";

    setTimeout(() => {
        loginSubtitle.textContent = "Enter your username and password";
        loginSubtitle.style.color = "#9e9e9e";
    }, 3000);
}

async function login() {
    const username = document.querySelector('#login-username').value;
    const password = document.querySelector('#login-password').value;

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

        if (response.status == 404) {
            loginError()
        } else if (response.status == 200) {
            setActivePage("main");
        }
    } 
    catch (e) {
        console.log("Failed to log in!")
    }
}

function signupRedirectHandler() {
    setActivePage("signup");
}


export {login, signupRedirectHandler};
