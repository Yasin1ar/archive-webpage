// FETCH INTRODUCTINO TEXT 
async function fetchIntroductionContent() {
  /**
   * Fetches introduction content from a static file.
   * @async
   * @returns {Promise<string|null>} The content text if successful, null if fetch fails
   * @throws {Error} When the HTTP response is not OK
   */
  try {
    const response = await fetch("introduction.txt"); // Assuming 'introduction' is served as a static file
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const text = await response.text();
    return text;
  } catch (error) {
    console.error("Could not fetch introduction file:", error);
    return null;
  }
}

function splitIntoParagraphs(content) {
  /**
   * Splits text content into paragraphs using '*' as delimiter.
   * @param {string} content - The text content to split
   * @returns {string[]} Array of trimmed non-empty paragraphs
   */
  return content
    ? content
        .split("*")
        .map((p) => p.trim())
        .filter((p) => p)
    : [];
}

function displayParagraph(paragraph, elementId) {
  /**
   * Displays a paragraph text in a DOM element with the specified ID.
   * @param {string} paragraph - The text content to display
   * @param {string} elementId - The ID of the target DOM element
   * @returns {void}
   */
  const element = document.getElementById(elementId);
  if (element) {
    element.textContent = paragraph;
  } else {
    console.error(`Element with ID "${elementId}" not found`);
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  const content = await fetchIntroductionContent();
  const paragraphs = splitIntoParagraphs(content);
  let currentParagraphIndex = 0;

  // Display the first paragraph on load
  displayParagraph(paragraphs[currentParagraphIndex], "paragraphDisplay");

  // Event listener for the Next button
  document.getElementById("nextButton").addEventListener("click", function () {
    currentParagraphIndex = (currentParagraphIndex + 1) % paragraphs.length;
    displayParagraph(paragraphs[currentParagraphIndex], "paragraphDisplay");
  });

  // Event listener for the Back button
  document.getElementById("backButton").addEventListener("click", function () {
    currentParagraphIndex =
      (currentParagraphIndex - 1 + paragraphs.length) % paragraphs.length;
    displayParagraph(paragraphs[currentParagraphIndex], "paragraphDisplay");
  });
});

// HAMBURGER BAR
function toggleMenu() {
  /**
   * Toggles the visibility of the header navigation menu by adding/removing 'active' class.
   * @returns {void}
   */
  const nav = document.querySelector(".header-nav");
  nav.classList.toggle("active");
}
