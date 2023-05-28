const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let id = urlParams.get("id");

const postHero = document.querySelector(".post-hero");
const postParagraph = document.querySelector(".post-paragraph");
const postHeroImg = document.querySelector(".post-hero-img");
const postHeroText = document.querySelector(".post-hero-text");
const modal = document.querySelector("#modal");
async function singlePost() {
  try {
    const response = await fetch(
      `https://exam1.stinenygren.no/wp-json/wp/v2/coffee/${id}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch post. Status: " + response.status);
    }

    const result = await response.json();
    console.log(result.acf.image);
    const date = result.date.slice(0, 10);

    document.title = "Post " + "| " + result.slug;

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

// Comment HTML

const commentForm = document.querySelector("#comment-form");

commentForm.innerHTML = `
<input type="hidden" id="postId" value="${id}" />
<div class="comment-name comment-all ">
  <label for="name">Name*</label>
  <input  id="name" type="text" required />
</div>
<div class="comment-email comment-all">
  <label for="email">Email*</label>
  <input id="email" type="email" required />
</div>
<div class="comment-text comment-all ">
  <label for="comment">Comment*</label>
  <textarea id="comment" required></textarea>
</div>
<input class="comment-btn btn color-white" type="submit" value="Post comment" />
`;

// Trying comments

const commentUrl = "https://exam1.stinenygren.no/wp-json/wp/v2/comments";

async function handleSubmit(evt) {
  evt.preventDefault();

  const [id, name, email, comment] = evt.target.elements;

  const data = JSON.stringify({
    post: id,
    author_name: name.value,
    author_email: email.value,
    content: comment.value,
  });

  try {
    const response = await fetch(commentUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });

    if (!response.ok) {
      throw new Error("Failed to submit comment. Status: " + response.status);
    }

    return response.json();
  } catch (error) {
    console.log(error);
  }
}

// async function handleSubmit(evt) {
//   evt.preventDefault();

//   const [id, name, email, comment] = evt.target.elements;

//   const data = JSON.stringify({
//     post: id,
//     author_name: name.value,
//     author_email: email.value,
//     content: comment.value,
//   });
//   console.log(data);

//   fetch("https://exam1.stinenygren.no/wp-json/wp/v2/comments", {
//     method: `POST`,
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: data,
//   })
//     .then((response) => {
//       if (response.ok === true) {
//       }

//       return response.json();
//     })
//     .catch((error) => console.error("Error", error));
// }
