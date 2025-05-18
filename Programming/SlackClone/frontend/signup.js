import { signupUrl } from "./env.js";
import { setActivePage } from "./globals.js";



function signUpError(errorMessage) {
    let signupSubtitle = document.querySelector('.signup-card-subtitle');

    signupSubtitle.textContent = errorMessage;
    signupSubtitle.style.color = "red";

    setTimeout(() => {
        signupSubtitle.textContent = "Enter a username and password";
        signupSubtitle.style.color = "#9e9e9e";
    }, 3000)
}

function signUpSuccess() {
    let signupSubtitle = document.querySelector('.signup-card-subtitle');

    signupSubtitle.textContent = "You're all set!";
    signupSubtitle.style.color = "green";
}

async function signUp() {
    const username = document.querySelector('#signup-username').value;
    const password = document.querySelector('#signup-password').value;
    const confirmPassword = document.querySelector('#signup-confirm-password').value;

    if (password !== confirmPassword) {
        signUpError("Passwords do not match!");
        return;
    }

    try {
        console.log("Hello......")
        const response = await fetch(signupUrl, {   
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })  

        console.log(response.status)

        if(response.status === 404) {
            signUpError("Failed to create a user account!");
        } else if (response.status === 201) {
            signUpSuccess();
            setTimeout(() => {
                setActivePage("login");
            }, 1500)
            
        }
    } 
    catch (e) {
        console.log("Failed to signup!")
    }
}

function loginRedirectHandler() {
    window.console.log("Hello!!!");
    setActivePage("login");
}

export {signUp, loginRedirectHandler};

