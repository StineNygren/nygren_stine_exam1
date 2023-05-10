const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let id = urlParams.get("id");
console.log(id);

const postHero = document.querySelector(".post-hero");
const postParagraph = document.querySelector(".post-paragraph");

async function singleJacket() {
  try {
    const response = await fetch(
      `https://exam1.stinenygren.no/wp-json/wp/v2/coffee/${id}`
    );
    const result = await response.json();
    console.log(result);
    const date = result.date.slice(0, 10);

    postHero.innerHTML = `
    <div>
    <img class="drink-img" src="${result.acf.image}" alt="${result.acf.alttext}">
    </div>
    <div>
    <p class="post.date">${date} | ${result.acf.readtime}</p>
    <h2 class="drink-name">${result.slug}</h2>
    <p class="drink-ingredients">${result.acf.ingredients}</p>
    </div>
      `;
    postParagraph.innerHTML = `
    <p class="drink-p font-size-small">${result.content.rendered}</p>
      `;
  } catch (error) {
    console.log(error);
  }
}

singleJacket();
