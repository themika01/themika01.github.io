// Defining dropdown sections
let generalSection = document.getElementById("general-history-section")
let fascismsSection = document.getElementById("fascisms-section");
let figuresSection = document.getElementById("figures-section");
let furtherSection = document.getElementById("further-section");
let mobileSection = document.getElementById("mobile-section");
// Sections array
let sections = [generalSection, fascismsSection, figuresSection, furtherSection, mobileSection];

// Open/close the section clicked on, section provided by button as number variable
function openDrop(number) {
    sections[number].classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropBtn')) {
    var i;
    for (i = 0; i < sections.length; i++) {
      var openDropdown = sections[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
} 