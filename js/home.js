// async function getBlogs() {
//   try {
//     const response = await fetch(
//       `https://exam1.stinenygren.no/wp-json/wp/v2/coffee?per_page=20`
//     );
//     const result = await response.json();
//     console.log(result);

//     //   totalPages = response.headers.get("X-WP-TotalPages");

//     postBlogs(result);

//     //   if (page >= totalPages) {
//     //     moreBtn.style.display = "none";
//     //   }
//   } catch (error) {
//     console.log(error);
//   }
// }

// getBlogs();

// function postBlogs(result) {
//   result.forEach((post) => {
//     const date = post.date.slice(0, 10);
//     carouselBlogPost.innerHTML += `
//         <a href="./post.html?id=${post.id}" class="carousel-post">
//           <img class="drink-img" src="${post.acf.image}" alt="${post.acf.alttext}">
//           <p class="post.date">${date} | ${post.acf.readtime}</p>
//           <h2 class="drink-name">${post.slug}</h2>
//           <p class="drink-ingredients">${post.acf.ingredients}</p>
//         </a>
//       `;
//   });
// }

// let count = 0;
// let inc = 0;
// let margin = 0;
// const carouselBlogPost = document.querySelector(".carousel-blog-post"); //sliderwith
// // const carouselSection = document.querySelector(".carousel-section");

// let itemDisplay = 0;

// if (screen.width > 990) {
//   itemDisplay = document
//     .querySelector(".carousel-section")
//     .getAttribute("blog-display-l");
// }
// if (screen.width > 700 && screen.width < 990) {
//   itemDisplay = document
//     .querySelector(".carousel-section")
//     .getAttribute("blog-display-m");
// }
// if (screen.width < 700) {
//   itemDisplay = document
//     .querySelector(".carousel-section")
//     .getAttribute("blog-display-s");
// }

// let carouselPost = document.querySelectorAll(".carousel-post");
// let itemLeft = carouselPost.length % itemDisplay;

// console.log(carouselPost.length);

// console.log(itemLeft);

async function getBlogs() {
  try {
    const response = await fetch(
      `https://exam1.stinenygren.no/wp-json/wp/v2/coffee?per_page=20`
    );
    const result = await response.json();
    console.log(result);

    //   totalPages = response.headers.get("X-WP-TotalPages");

    postBlogs(result);

    //   if (page >= totalPages) {
    //     moreBtn.style.display = "none";
    //   }
  } catch (error) {
    console.log(error);
  }
}

getBlogs();

function postBlogs(result) {
  result.forEach((post) => {
    const date = post.date.slice(0, 10);
    carouselBlogPost.innerHTML += `
          <a href="./post.html?id=${post.id}" class="carousel-post">
            <img class="drink-img" src="${post.acf.image}" alt="${post.acf.alttext}">
            <p class="post.date">${date} | ${post.acf.readtime}</p>
            <h2 class="drink-name">${post.slug}</h2>
            <p class="drink-ingredients">${post.acf.ingredients}</p>
          </a>
        `;
  });
  calculateItemsLeft();
}

let count = 0;
let inc = 0;
let margin = 0;
const carouselBlogPost = document.querySelector(".carousel-blog-post"); //sliderwith
// const carouselSection = document.querySelector(".carousel-section");

async function getBlogs() {
  // ...
}

function postBlogs(result) {
  // ...
}

function calculateItemsLeft() {
  let carouselPost = document.querySelectorAll(".carousel-post");
  let itemDisplay = 0;

  if (screen.width > 990) {
    itemDisplay = document
      .querySelector(".carousel-section")
      .getAttribute("blog-display-l");
  }
  if (screen.width > 700 && screen.width < 990) {
    itemDisplay = document
      .querySelector(".carousel-section")
      .getAttribute("blog-display-m");
  }
  if (screen.width < 700) {
    itemDisplay = document
      .querySelector(".carousel-section")
      .getAttribute("blog-display-s");
  }

  let itemLeft = carouselPost.length % itemDisplay;
  console.log(carouselPost.length);
  console.log(itemLeft);
}

// getBlogs();
