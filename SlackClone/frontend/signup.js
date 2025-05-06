import { signupUrl } from "./env.js";
import { setActivePage } from "./globals.js";



function signUpError(errorMessage) {

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

        if(response.status = 404) {
            signUpError();
        } else if (responses.status == 200) {
            // Maybe change the subtitle here?
            setActivePage("login");
        }
    } 
    catch (e) {
        console.log("Failed to signup!")
    }
}

function loginRedirectHandler {

}

export {signUp, loginRedirectHandler};

