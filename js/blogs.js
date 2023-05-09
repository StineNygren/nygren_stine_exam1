// const blogPosts = document.querySelector(".blog-posts");
// let displayedPosts = 10;

// async function getBlogs() {
//   try {
//     const response = await fetch(
//       `https://exam1.stinenygren.no/wp-json/wp/v2/coffee?per_page=20`
//     );
//     const result = await response.json();
//     console.log(result);

//     postBlogs(result);
//   } catch (error) {
//     console.log(error);
//   }
// }

// getBlogs();

// function postBlogs(result) {
//   for (let i = 0; i <= displayedPosts; i++) {
//     blogPosts.innerHTML += `
//    <a href="./post.html?id=${result[i].id}" class="post">
//    <img class="drink-img" src="${result[i].acf.image}" alt="">
//    <h2 class="jacket-name">${result[i].slug}</h2>
//    <p class="jacket-price">${result[i].acf.ingredients}</p>
//    </a>

//     `;
//   }
// }

// const moreBtn = document.querySelector(".more-btn");

// moreBtn.addEventListener("click", () => {
//   displayedPosts += 10;
// });

//try two

// const blogPosts = document.querySelector(".blog-posts");
// let page = 1;

// async function getBlogs() {
//   try {
//     const response = await fetch(
//       `https://exam1.stinenygren.no/wp-json/wp/v2/coffee?per_page=10&page=${page}`
//     );
//     const result = await response.json();
//     console.log(result);

//     postBlogs(result);
//   } catch (error) {
//     console.log(error);
//   }
// }

// getBlogs();

// function postBlogs(result) {
//   result.forEach((post) => {
//     blogPosts.innerHTML += `
//       <a href="./post.html?id=${post.id}" class="post">
//         <img class="drink-img" src="${post.acf.image}" alt="">
//         <h2 class="drink-name">${post.slug}</h2>
//         <p class="drink-ingredients">${post.acf.ingredients}</p>
//       </a>
//     `;
//   });
// }

// const moreBtn = document.querySelector(".more-btn");

// moreBtn.addEventListener("click", () => {
//   page++;
//   getBlogs();
//   if (page >= result.length){
//     moreBtn.style.display = "none";
//   }
// });

//try thre

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
      <a href="./post.html?id=${post.id}" class="post">
        <img class="drink-img" src="${post.acf.image}" alt="${post.acf.alttext}">
        <p class="post-date">${date} | ${post.acf.readtime}</p>
        <h2 class="drink-name">${post.slug}</h2>
        <p class="drink-ingredients">${post.acf.ingredients}</p>
      </a>
    `;
  });
}

moreBtn.addEventListener("click", () => {
  page++;
  getBlogs();
});
