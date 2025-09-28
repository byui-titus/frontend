const API_URL = "https://backend-xhkx.onrender.com/Movie"; // adjust if needed

async function fetchVJMovies() {
    const params = new URLSearchParams(window.location.search);
    const vj = params.get("vj");

    if (!vj) return;

    document.getElementById("vj-name").textContent = `Movies by VJ: ${vj}`;

    try {
        const res = await fetch(API_URL);
        const movies = await res.json();

        const container = document.getElementById("movies");
        container.innerHTML = "";

        // Filter movies for this VJ
        const vjMovies = movies.filter(movie => movie.vj === vj);

        if (vjMovies.length === 0) {
            container.innerHTML = "<p>No movies found for this VJ.</p>";
            return;
        }

        vjMovies.forEach(movie => {
            const card = document.createElement("div");
            card.classList.add("movie-card");

            card.innerHTML = `
        <img src="${movie.poster}" alt="${movie.title}" />
        <h3>${movie.title}</h3>
        <p><strong>Year:</strong> ${movie.releaseYear}</p>
        <p><strong>Rating:</strong> ${movie.rating}</p>
      `;

            card.addEventListener("click", () => {
                window.location.href = `detail/details.html?id=${movie._id}`;
            });

            container.appendChild(card);
        });
    } catch (err) {
        console.error("Error loading VJ movies:", err);
    }
}

fetchVJMovies();

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