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
        // Fetch movie details
        const url = `${BASE}/movie/${id}?api_key=${API_KEY}&language=en-US`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`TMDB error ${res.status}`);
        const movie = await res.json();

        // Fetch streaming providers
        const providersRes = await fetch(`${BASE}/movie/${id}/watch/providers?api_key=${API_KEY}`);
        const providersData = await providersRes.json();

        renderMovie(movie, providersData);
    } catch (err) {
        console.error("Failed to fetch movie details:", err);
        document.getElementById("movie-detail").innerHTML = `<p>Error: ${err.message}</p>`;
    }
}

function renderMovie(m, providersData) {
    const poster = m.poster_path ? `${IMAGE_BASE}${m.poster_path}` : "/images/placeholder.png";

    // Get providers for your region (default to 'US' if not available)
    const region = providersData.results.US || providersData.results.EN || providersData.results || {};
    const flatrate = region.flatrate || [];
    const rent = region.rent || [];
    const buy = region.buy || [];

    // Build provider logos section
    const providerHTML = [...flatrate, ...rent, ...buy]
        .map(p => `
      <div class="provider">
        <img src="https://image.tmdb.org/t/p/w200${p.logo_path}" alt="${escapeHtml(p.provider_name)}" title="${escapeHtml(p.provider_name)}" />
        <p>${escapeHtml(p.provider_name)}</p>
      </div>
    `)
        .join("") || "<p>No streaming information available.</p>";

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

        <h3>Available On</h3>
        <div class="providers">${providerHTML}</div>
      </div>
    </div>
  `;

    document.getElementById("movie-detail").innerHTML = html;
}

function escapeHtml(str = "") {
    return String(str).replace(/[&<>"']/g, (s) =>
        ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[s])
    );
}

document.addEventListener("DOMContentLoaded", fetchMovie);

// Load header/footer partials


async function loadPartial(id, file) {
    try {
        const response = await fetch(`/partials/${file}`);
        const content = await response.text();
        document.getElementById(id).innerHTML = content;
    } catch (err) {
        console.error("Error loading partial:", file, err);
    }
}

function updateAuthLinks() {
    const token = localStorage.getItem("token");
    const loginLink = document.getElementById("loginLink");
    const registerLink = document.getElementById("registerLink");
    const logoutLink = document.getElementById("logoutLink");

    if (token) {
        // ✅ User is logged in
        loginLink.style.display = "none";
        registerLink.style.display = "none";
        logoutLink.style.display = "inline-block";

        logoutLink.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            alert("You have been logged out.");
            window.location.href = "/index.html";
        });
    } else {
        // ✅ User not logged in
        loginLink.style.display = "inline-block";
        registerLink.style.display = "inline-block";
        logoutLink.style.display = "none";
    }
}

// Load Header & Footer
document.addEventListener("DOMContentLoaded", () => {
    loadPartial("header-placeholder", "header.html");
    loadPartial("footer-placeholder", "footer.html");
});

/*async function fetchMovie() {
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
*/