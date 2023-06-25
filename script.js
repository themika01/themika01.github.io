console.log("Howdy partner") //Confirm that JS is running

//Defining page elements
const btnAbout = document.getElementById("about")
const btnSocials = document.getElementById("socials")
const btnMusic = document.getElementById("music")
const btnMovie = document.getElementById("movie")
const aboutBtns = [btnAbout, btnSocials, btnMusic, btnMovie]

const conAbout = document.getElementById("about-content")
const conSocial = document.getElementById("social-content")
const conMusic = document.getElementById("music-content")
const conMovie = document.getElementById("movie-content")
const aboutContent = [conAbout, conSocial, conMusic, conMovie]

//Showing divs containing content from the about me sections
let lastSelect = -1
shown = false
const showAboutContent = function(btnNumber) {
    for (let i = 0; i<aboutContent.length; i++) { //Close other windows
        aboutContent[i].className = "button-content-hidden"
        aboutBtns[i].className = "more-information"
    }
    if (shown == false || shown == true && lastSelect != btnNumber) { //Open selected content
        aboutBtns[btnNumber].className = "more-information-selected"
        aboutContent[btnNumber].className = "button-content-shown"
        lastSelect = btnNumber
        shown = true
    } else { //Dont show any if the user clicks on the same button they opened
        lastSelect = -1
        shown = false
    }
}

//Event listeners
btnAbout.addEventListener("click", function(){showAboutContent(0)})
btnSocials.addEventListener("click", function(){showAboutContent(1)})
btnMusic.addEventListener("click", function(){showAboutContent(2)})
btnMovie.addEventListener("click", function(){showAboutContent(3)})