const blogPosts = document.querySelector(".blog-posts");
const moreBtn = document.querySelector(".more-btn");
let page = 1;
let totalPages;

async function getBlogs() {
  try {
    const response = await fetch(
      `https://exam1.stinenygren.no/wp-json/wp/v2/coffee?per_page=10&page=${page}`
    );
    const result = await response.json();
    console.log(result);

    totalPages = response.headers.get("X-WP-TotalPages");

    postBlogs(result);

    if (page >= totalPages) {
      moreBtn.style.display = "none";
    }
  } catch (error) {
    console.log(error);
  }
}

getBlogs();

function postBlogs(result) {
  result.forEach((post) => {
    const date = post.date.slice(0, 10);
    blogPosts.innerHTML += `
      <a href="./post.html?id=${post.id}" class="post link">
        <img class="drink-img" src="${post.acf.image}" alt="${post.acf.alttext}">
        <div class="post-text">
        <p class="post-date link">${date} | ${post.acf.readtime}</p>
        <h2 class="drink-name link">${post.slug}</h2>
        <p class="drink-ingredients link">${post.acf.ingredients}</p>
        </div>
      </a>
    `;
  });
}

moreBtn.addEventListener("click", () => {
  page++;
  getBlogs();
});
