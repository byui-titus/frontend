const API_URL = "https://backend-xhkx.onrender.com/Movie";

function getMovieId() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

async function fetchMovie() {
    const id = getMovieId();
    const res = await fetch(`${API_URL}/${id}`);
    const movie = await res.json();

    const container = document.getElementById("movie-details");
    container.innerHTML = `
    <h1>${movie.title}</h1>
    <video controls width="600">
      <source src="${movie.filePath || ''}" type="video/mp4">
      Your browser does not support video playback.
    </video>
    <p>${movie.description}</p>
    <p><strong>Genre:</strong> ${movie.genre}</p>
    <p><strong>Release Year:</strong> ${movie.releaseYear}</p>
    <p><strong>Rating:</strong> ${movie.rating}</p>
    <p><strong>Vj:</strong> ${movie.vj}</p>
    <!-- ✅ Download Button -->
    <a href="${movie.filePath}" download class="download-btn">⬇️ Download</a>
  `;
}

fetchMovie();

async function loadPartial(id, file) {
    try {
        const response = await fetch(`/partials/${file}`);
        const content = await response.text();
        document.getElementById(id).innerHTML = content;
    } catch (err) {
        console.error("Error loading partial:", file, err);
    }
}

// Load Header & Footer
document.addEventListener("DOMContentLoaded", () => {
    loadPartial("header-placeholder", "header.html");
    loadPartial("footer-placeholder", "footer.html");
});