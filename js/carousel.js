import getBlogs from "./api.js";

const carousel = document.querySelector(".carousel");
const carouselWrapper = document.querySelector(".carousel-wrapper");
const carouselBtn = document.querySelectorAll(".carousel-wrapper i");

let firstCardWidth;

async function getCarousel() {
  const result = await getBlogs();
  postBlogs(result);
  firstCardWidth = carousel.querySelector(".carousel-post").offsetWidth;
}

function postBlogs(result) {
  result.forEach((post) => {
    const date = post.date.slice(0, 10);
    carousel.innerHTML += `
              <div class="carousel-post flex" draggable="false">
                <img class="drink-img" src="${post.acf.image}" alt="${post.acf.alttext}" draggable="false">
                <div class="carousel-text">
                <p class="post-date">${date} | ${post.acf.readtime}</p>
                <h2 class="drink-name">${post.slug}</h2>
                <p class="drink-ingredients">${post.acf.ingredients}</p>
                <a href="./post.html?id=${post.id}" class="post-link " >read post</a>
                </div>
              </div>
            `;
  });
}

function scrollCarousel(direction) {
  const currentScrollLeft = carousel.scrollLeft;
  const targetScrollLeft =
    direction === "prev"
      ? currentScrollLeft - firstCardWidth
      : currentScrollLeft + firstCardWidth;

  carousel.scrollTo({
    left: targetScrollLeft,
    behavior: "smooth",
  });
}

carouselBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    scrollCarousel(btn.id);
  });
});

let isDragging = false,
  startX,
  startScrollLeft;

function dragStart(e) {
  isDragging = true;
  startX = e.type === "touchstart" ? e.touches[0].pageX : e.pageX;
  startScrollLeft = carousel.scrollLeft;
}

function dragging(e) {
  if (!isDragging) return;
  const currentX = e.type === "touchmove" ? e.touches[0].pageX : e.pageX;
  carousel.scrollLeft = startScrollLeft - (currentX - startX);
}

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

getCarousel();
