const blogPosts = document.querySelector(".blog-posts");
const moreBtn = document.querySelector(".more-btn");
let page = 1;
let totalPages;

async function getBlogs() {
  try {
    const response = await fetch(
      `https://exam1.stinenygren.no/wp-json/wp/v2/coffee?per_page=10&page=${page}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch blogs. Status: " + response.status);
    }

    const result = await response.json();

    totalPages = response.headers.get("X-WP-TotalPages");

    result.forEach((post) => {
      const date = post.date.slice(0, 10);
      blogPosts.innerHTML += `
      <article class="post">
        <a href="./post.html?id=${post.id}" class=" link ">
          <img class="drink-img" src="${post.acf.image}" alt="${post.acf.alttext}">
          <div class="post-text">
          <p class="post-date link font-size-small">${date} | ${post.acf.readtime}</p>
          <h2 class="drink-name link font-size-large">${post.slug}</h2>
          <p class="drink-ingredients link font-size-small">${post.acf.ingredients}</p>
          </div>
        </a>
        </article>
      `;
      if (page >= totalPages) {
        moreBtn.style.display = "none";
      }
    });

    searchPosts(result);
  } catch (error) {
    console.log(error);
  }
}

getBlogs();

function searchPosts(result) {
  const searchInput = document.querySelector("#search-input");
  const postCards = document.querySelectorAll(".post");

  searchInput.addEventListener("focus", (e) => {
    page++;
    getBlogs();
  });

  for (let i = 0; i < postCards.length; i++) {
    const drinkName = document.querySelectorAll(".drink-name");

    searchInput.addEventListener("input", (e) => {
      const value = e.target.value.toLowerCase();

      postCards.forEach((postCard) => {
        const drinkName = postCard
          .querySelector(".drink-name")
          .textContent.toLowerCase();
        const visible = drinkName.includes(value);
        postCard.classList.toggle("hide", !visible);
      });
    });
  }
}

moreBtn.addEventListener("click", () => {
  page++;
  getBlogs();
});
