// js/details.js
const API_KEY =
    import.meta.env.VITE_TMDB_API_KEY;
const BASE =
    import.meta.env.VITE_BASE_URL || "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

function getMovieId() {
    const p = new URLSearchParams(window.location.search);
    return p.get("id");
}

async function fetchMovie() {
    const id = getMovieId();
    if (!id) {
        document.getElementById("movie-detail").innerHTML = "<p>No movie id provided.</p>";
        return;
    }
    try {
        const url = `${BASE}/movie/${id}?api_key=${API_KEY}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`TMDB error ${res.status}`);
        const movie = await res.json();
        renderMovie(movie);
    } catch (err) {
        console.error("Failed to fetch movie details:", err);
        document.getElementById("movie-detail").innerHTML = `<p>Error: ${err.message}</p>`;
    }
}

function renderMovie(m) {
    const poster = m.poster_path ? `${IMAGE_BASE}${m.poster_path}` : "/images/placeholder.png";
    const html = `
    <div class="details-wrapper">
      <div class="poster">
        <img src="${poster}" alt="${escapeHtml(m.title)}" />
      </div>
      <div class="info">
        <h1>${escapeHtml(m.title)}</h1>
        <p><strong>Release:</strong> ${escapeHtml(m.release_date || "N/A")}</p>
        <p><strong>Rating:</strong> ${escapeHtml(String(m.vote_average || "N/A"))}</p>
        <p><strong>Genres:</strong> ${m.genres ? m.genres.map(g => escapeHtml(g.name)).join(", ") : "N/A"}</p>
        <h3>Overview</h3>
        <p>${escapeHtml(m.overview || "No overview available.")}</p>
      </div>
    </div>
  `;
    document.getElementById("movie-detail").innerHTML = html;
}

function escapeHtml(str = "") {
    return String(str).replace(/[&<>"']/g, (s) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[s]));
}

document.addEventListener("DOMContentLoaded", fetchMovie);


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