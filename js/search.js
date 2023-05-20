async function getBlogs() {
  try {
    const response = await fetch(
      `https://exam1.stinenygren.no/wp-json/wp/v2/coffee?per_page=20`
    );
    const result = await response.json();
    console.log(result);
    searchPosts(result);
  } catch (error) {
    console.log(error);
  }
}
getBlogs();

function searchPosts(result) {
  const searchInput = document.querySelector("#search-input");
  const postCard = document.querySelector(".post");

  searchInput.addEventListener("input", (e) => {
    const value = e.target.value;

    result.forEach((post) => {
      const coffeeName = post.slug;
      console.log(coffeeName);
      console.log(value);
      const visible = post.slug.includes(value);
      postCard.classList.toggle("hide", !visible);
    });
  });
}

// const searchInput = document.querySelector("#search-input");

// searchInput.addEventListener("input", (e) => {
//   const value = e.target.value;
//   console.log(value);
// });
