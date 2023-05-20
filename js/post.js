const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let id = urlParams.get("id");

const postHero = document.querySelector(".post-hero");
const postParagraph = document.querySelector(".post-paragraph");
const main = document.querySelector("main");
const postHeroImg = document.querySelector(".post-hero-img");
const postHeroText = document.querySelector(".post-hero-text");
const modal = document.querySelector("#modal");
async function singlePost() {
  try {
    const response = await fetch(
      `https://exam1.stinenygren.no/wp-json/wp/v2/coffee/${id}`
    );
    const result = await response.json();
    console.log(result.acf.image);
    const date = result.date.slice(0, 10);

    document.title = result.slug;

    postHeroImg.innerHTML = `
    <img class="hero-drink-img"  src="${result.acf.imagel}" alt="${result.acf.alttext}">
    `;
    modal.innerHTML = `
    <img class="drink-img-modal"  src="${result.acf.imagel}" alt="${result.acf.alttext}">
    `;

    postHeroText.innerHTML = `


    <p class="post-date font-size-small">${date} | ${result.acf.readtime}</p>
    <h2 class="drink-name font-size-large">${result.slug}</h2>
    <p class="drink-ingredients font-size-small">${result.acf.ingredients}</p>


      `;
    postParagraph.innerHTML = `
    <p class="drink-p ">${result.content.rendered}</p>
      `;
  } catch (error) {
    console.log(error);
  }
}

singlePost();

window.onload = function () {
  const openModal = document.querySelector("#openmodal");
  console.log(openModal);
};

const modalclass = document.querySelector(".modal");

const openModal = document.querySelector("#openmodal");
const modalImg = document.querySelector("#modal-img");

openModal.onclick = function () {
  modalclass.style.display = "block";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
