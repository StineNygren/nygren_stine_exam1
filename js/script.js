const navigationSection = document.querySelector(".navigation-list");
const toggleButton = document.querySelector(".toggle-butten");

toggleButton.addEventListener("click", () => {
  navigationSection.classList.toggle("active");
});

function myFunction(x) {
  x.classList.toggle("fa-x");
}
