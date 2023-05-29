const url = "https://exam1.stinenygren.no/wp-json/wp/v2/coffee?per_page=20";

async function getBlogs() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch blogs. Status: " + response.status);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}

export default getBlogs;
