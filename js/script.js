const navigationSection = document.querySelector(".navigation-list");
const toggleButton = document.querySelector(".toggle-butten");
const coffeeIcon = document.querySelector(".coffee-icon");

toggleButton.addEventListener("click", () => {
  navigationSection.classList.toggle("active");
  coffeeIcon.classList.toggle("active");
});

function myFunction(x) {
  x.classList.toggle("fa-x");
}
