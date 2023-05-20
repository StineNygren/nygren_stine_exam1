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
    // console.log(result);

    totalPages = response.headers.get("X-WP-TotalPages");

    postBlogs(result);
    searchPosts(result);

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
      <a href="./post.html?id=${post.id}" class="post link ">
        <img class="drink-img" src="${post.acf.image}" alt="${post.acf.alttext}">
        <div class="post-text">
        <p class="post-date link font-size-small">${date} | ${post.acf.readtime}</p>
        <h2 class="drink-name link font-size-large">${post.slug}</h2>
        <p class="drink-ingredients link font-size-small">${post.acf.ingredients}</p>
        </div>
      </a>
    `;
  });
}

const searchInput = document.querySelector("#search-input");
const postCard = document.querySelector(".post");
// console.log(postCard);
let postChild = blogPosts.children;
let postGrandChild = postChild.children;
// console.log(postChild[1]);

// console.log(blogPosts.children);

function searchPosts(result) {
  searchInput.addEventListener("input", (e) => {
    const value = e.target.value;

    result.forEach((post) => {
      const coffeeName = post.slug;
      // console.log(coffeeName);
      // console.log(value);
      const visible = post.slug.includes(value);
      // console.log(post);
      // console.log(blogPosts);
      // console.log(postGrandChild);
      // postGrandChild.classList.toggle("hide", !visible);
    });
  });
}

moreBtn.addEventListener("click", () => {
  page++;
  getBlogs();
});
