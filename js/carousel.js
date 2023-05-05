import getBlogs from "./test.js";
// async function getBlogs() {
//   try {
//     const response = await fetch(
//       `https://exam1.stinenygren.no/wp-json/wp/v2/coffee?per_page=20`
//     );
//     const result = await response.json();

//     postBlogs(result);
//   } catch (error) {
//     console.log(error);
//   }
// }

// getBlogs();

// const carousel = document.querySelector(".carousel");
// const carouselWrapper = document.querySelector(".carousel-wrapper");
// const carouselBtn = document.querySelectorAll(".carousel-wrapper i");
// const firstCardWidth = carousel.querySelector(".carousel-post").offsetWidth;

// function postBlogs(result) {
//   result.forEach((post) => {
//     const date = post.date.slice(0, 10);
//     carousel.innerHTML += `
//               <a href="./post.html?id=${post.id}" class="carousel-post" draggable="false">
//                 <img class="drink-img" src="${post.acf.image}" alt="${post.acf.alttext}" draggable="false">
//                 <p class="post.date">${date} | ${post.acf.readtime}</p>
//                 <h2 class="drink-name">${post.slug}</h2>
//                 <p class="drink-ingredients">${post.acf.ingredients}</p>
//               </a>
//             `;
//   });
// }

// carouselBtn.forEach((btn) => {
//   btn.addEventListener("click", () => {
//     console.scrollLeft += btn.id === "prev" ? -firstCardWidth : firstCardWidth;
//   });
// });

// let isDragging = false,
//   startX,
//   startScrollLeft;

// const dragStart = (e) => {
//   isDragging = true;
//   carousel.classList.add("dragging");

//   startX = e.pageX;

//   startScrollLeft = carousel.scrollLeft;
// };

// const dragging = (e) => {
//   if (!isDragging) return;
//   carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
// };

// const dragStop = () => {
//   isDragging = false;
//   //   carousel.classList.remove("dragging");
// };

// carousel.addEventListener("mousedown", dragStart);
// carousel.addEventListener("mousemove", dragging);
// document.addEventListener("mouseup", dragStop);

// main.js

//The most sucsessful code

const carousel = document.querySelector(".carousel");
const carouselWrapper = document.querySelector(".carousel-wrapper");
const carouselBtn = document.querySelectorAll(".carousel-wrapper i");

let firstCardWidth;

getBlogs().then((result) => {
  postBlogs(result);
  firstCardWidth = carousel.querySelector(".carousel-post").offsetWidth;
});

console.log(firstCardWidth);

function postBlogs(result) {
  result.forEach((post) => {
    const date = post.date.slice(0, 10);
    carousel.innerHTML += `
              <a href="./post.html?id=${post.id}" class="carousel-post" draggable="false">
                <img class="drink-img" src="${post.acf.image}" alt="${post.acf.alttext}" draggable="false">
                <p class="post.date">${date} | ${post.acf.readtime}</p>
                <h2 class="drink-name">${post.slug}</h2>
                <p class="drink-ingredients">${post.acf.ingredients}</p>
              </a>
            `;
  });
}

carouselBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id === "prev" ? -firstCardWidth : firstCardWidth;
  });
});

let isDragging = false,
  startX,
  startScrollLeft;

const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");

  startX = e.pageX;

  startScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  if (!isDragging) return;
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
  isDragging = false;
  //   carousel.classList.remove("dragging");
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);

window.addEventListener("resize", () => {
  const updatedWidth = carousel.offsetWidth;
});
