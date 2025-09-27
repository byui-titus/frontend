const API_URL = "https://backend-xhkx.onrender.com/Movie";

async function fetchMovies() {
    const res = await fetch(API_URL);
    const movies = await res.json();

    const container = document.getElementById("movies");
    container.innerHTML = "";

    // Sort by createdAt (newest first)
    movies.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));


    // Limit to 8 movies (change 8 to whatever number you want, e.g. 6, 10)
    const limitedMovies = movies.slice(0, 8);

    limitedMovies.forEach(movie => {
        const card = document.createElement("div");
        card.classList.add("movie-card");

        card.innerHTML = `
          <img src="${movie.poster}" alt="${movie.title}" />
          <h3>${movie.title}</h3>
          <p><strong>Vj:</strong> ${movie.vj}</p>
        `;

        // Click -> details page
        card.addEventListener("click", () => {
            window.location.href = `detail/details.html?id=${movie._id}`;
        });

        container.appendChild(card);
    });
}

fetchMovies();

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