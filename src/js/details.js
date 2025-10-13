import videojs from "video.js";
import "video.js/dist/video-js.css";

const API_URL = "https://backend-xhkx.onrender.com/Movie";

import { requireAuth } from "./authGuard";
requireAuth();

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
          <source src="${movie.filePath}" type="application/x-mpegURL" />
        <!-- fallback for mp4 if HLS not supported -->
        <source src="${movie.filePath}" type="video/mp4" />
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

        document.addEventListener("DOMContentLoaded", () => {
        const token = localStorage.getItem("token");
        const loginLink = document.getElementById("loginLink");
        const registerLink = document.getElementById("registerLink");
        const logoutLink = document.getElementById("logoutLink");

        if (token) {
            // User is logged in
            if (loginLink) loginLink.style.display = "none";
            if (registerLink) registerLink.style.display = "none";
            if (logoutLink) logoutLink.style.display = "inline";
        } else {
            // User is NOT logged in
            if (logoutLink) logoutLink.style.display = "none";
            if (loginLink) loginLink.style.display = "inline";
            if (registerLink) registerLink.style.display = "inline";
        }

        // ✅ Handle Logout click
        if (logoutLink) {
            logoutLink.addEventListener("click", (e) => {
                e.preventDefault();
                localStorage.removeItem("token");
                localStorage.removeItem("user"); // optional if you store user info
                window.location.href = "/login/login.html";
            });
        }
    });
}

// Load Header & Footer
document.addEventListener("DOMContentLoaded", () => {
    loadPartial("header-placeholder", "header.html");
    loadPartial("footer-placeholder", "footer.html");
});