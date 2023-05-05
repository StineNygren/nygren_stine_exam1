// api.js
async function getBlogs() {
  try {
    const response = await fetch(
      `https://exam1.stinenygren.no/wp-json/wp/v2/coffee?per_page=20`
    );
    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);
  }
}

export default getBlogs;
