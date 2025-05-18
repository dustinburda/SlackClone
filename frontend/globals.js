let loginPage = document.querySelector(".login-page");
let signupPage = document.querySelector(".signup-page");
let mainPage = document.querySelector(".main-page");

const pages =  { 
    "login": loginPage, 
    "signup": signupPage, 
    "main": mainPage
}

function setActivePage( pageToActivate ) {
    for (let [_, page] of Object.entries(pages)) {
        console.log(page);
        page.classList.add("hidden");
    }

    pages[pageToActivate].classList.remove("hidden");

}

export { setActivePage };