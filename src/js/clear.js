// js/movies.js
const API_KEY =
    import.meta.env.VITE_TMDB_API_KEY;
const BASE =
    import.meta.env.VITE_BASE_URL || "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";



async function fetchMovies() {
    try {
        // popular movies - you can change endpoint (discover, trending, etc.)
        const url = `${BASE}/movie/popular?api_key=${API_KEY}&page=1`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`TMDB error ${res.status}`);
        const data = await res.json();
        renderMovies(data.results || []);
    } catch (err) {
        console.error("Failed to fetch movies:", err);
        document.getElementById("movies").innerHTML = `<p>Error loading movies: ${err.message}</p>`;
    }
}
async function fetchMovie() {
    try {
        // popular movies - you can change endpoint (discover, trending, etc.)
        const url = `${BASE}/movie/trending?api_key=${API_KEY}&page=1`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`TMDB error ${res.status}`);
        const data = await res.json();
        renderMovie(data.results || []);
    } catch (err) {
        console.error("Failed to fetch movies:", err);
        document.getElementById("trending").innerHTML = `<p>Error loading movies: ${err.message}</p>`;
    }
}

function renderMovies(movies) {
    const container = document.getElementById("movies");
    if (!movies.length) {
        container.innerHTML = "<p>No movies found.</p>";
        return;
    }

    container.innerHTML = movies.map(m => {
        const poster = m.poster_path ? `${IMAGE_BASE}${m.poster_path}` : "/images/placeholder.png";
        return `
      <div class="card" >
      <a onclick=window.location.href="/detail/clear.html?id=${m.id}">
          <img src="${poster}" alt="${escapeHtml(m.title)}" />
          <h3>${escapeHtml(m.title)}</h3>
        </a>

      </div>

    `;
    }).join("");
}

// small helper to avoid bare HTML injection
function escapeHtml(str = "") {
    return String(str).replace(/[&<>"']/g, (s) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[s]));
}

document.addEventListener("DOMContentLoaded", fetchMovies);
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