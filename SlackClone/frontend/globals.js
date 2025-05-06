let loginPage = document.querySelector(".login-page");
let signupPage = document.querySelector(".signup-page");
let welcomePage = document.querySelector(".welcome-page");

const pages =  { 
    "login": loginPage, 
    "signup": signupPage, 
    "welcome": welcomePage
}

function setActivePage( pageToActivate ) {
    for (let [_, page] of Object.entries(pages)) {
        console.log(page);
        page.classList.add("hidden");
    }

    pages[pageToActivate].classList.remove("hidden");

}

export { setActivePage };