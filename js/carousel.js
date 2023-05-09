import getBlogs from "./test.js";

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
              <div class="carousel-post" draggable="false">
                <img class="drink-img" src="${post.acf.image}" alt="${post.acf.alttext}" draggable="false">
                <div class="carousel-text">
                <p class="post.date">${date} | ${post.acf.readtime}</p>
                <h2 class="drink-name">${post.slug}</h2>
                <p class="drink-ingredients">${post.acf.ingredients}</p>
                <a href="./post.html?id=${post.id}" >read post</a>
                </div>
              </div>
            `;
  });
}

carouselBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const currentScrollLeft = carousel.scrollLeft;
    const targetScrollLeft =
      btn.id === "prev"
        ? currentScrollLeft - firstCardWidth
        : currentScrollLeft + firstCardWidth;
    const index = Math.round(targetScrollLeft / firstCardWidth);
    const newScrollLeft = index * firstCardWidth;
    carousel.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    });
  });
});

let isDragging = false,
  startX,
  startScrollLeft;

const dragStart = (e) => {
  isDragging = true;
  if (e.type === "touchstart") {
    startX = e.touches[0].pageX;
  } else {
    startX = e.pageX;
  }
  startScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  if (!isDragging) return;
  let currentX;
  if (e.type === "touchmove") {
    currentX = e.touches[0].pageX;
  } else {
    currentX = e.pageX;
  }
  carousel.scrollLeft = startScrollLeft - (currentX - startX);
};

const dragStop = (e) => {
  isDragging = false;
  carousel.classList.remove("dragging");

  const currentScrollLeft = carousel.scrollLeft;
  const index = Math.round(currentScrollLeft / firstCardWidth);
  const newScrollLeft = index * firstCardWidth;
  carousel.scrollTo({
    left: newScrollLeft,
    behavior: "smooth",
  });
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);

carousel.addEventListener("touchstart", dragStart);
carousel.addEventListener("touchmove", dragging);
carousel.addEventListener("touchend", dragStop);

window.addEventListener("resize", () => {
  firstCardWidth = carousel.querySelector(".carousel-post").offsetWidth;
});
