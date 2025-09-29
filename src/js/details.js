import videojs from "video.js";
import "video.js/dist/video-js.css";

const API_URL = "https://backend-xhkx.onrender.com/Movie";

function mimeType(filePath) {
    if (!filePath) return "";
    if (filePath.endsWith(".m3u8")) return "application/x-mpegURL"; // HLS
    if (filePath.endsWith(".mp4")) return "video/mp4"; // MP4
    return "video/mp4"; // fallback
}

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

    <div class="video-container">
        <video
          id="bunny-player"
          class="video-js vjs-big-play-centered"
          controls
          preload="auto"
          width="100%"
          height="auto"
          data-setup='{}'
        >
          <source src="${movie.filePath || ''}" type="${mimeType}" />
          Your browser does not support the video tag.
        </video>
      </div>



    <p>${movie.description}</p>
    <p><strong>Genre:</strong> ${movie.genre}</p>
    <p><strong>Release Year:</strong> ${movie.releaseYear}</p>
    <p><strong>Rating:</strong> ${movie.rating}</p>
    <p><strong>Vj:</strong> ${movie.vj}</p>

    ${movie.downloadLink ? `
        <a href="${movie.downloadLink}" target="_blank" class="download-btn">⬇️ Download</a>` : ""}
    `;

    if (movie.filePath) {
      videojs("bunny-player", {
        controls: true,
        autoplay: false,
        preload: "auto",
        responsive: true,
        fluid: true,
      });
    }

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