const API_URL = "https://backend-xhkx.onrender.com/Movie";

async function fetchMovies() {
    const res = await fetch(API_URL);
    const movies = await res.json();

    const container = document.getElementById("movies");
    container.innerHTML = "";

    // Sort by createdAt (newest first)
    movies.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));



    // Limit to 8 movies (change 8 to whatever number you want, e.g. 6, 10)
    const limitedMovies = movies.slice(0, 12);

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

async function fetchHeroVJs() {
    try {
        const res = await fetch(API_URL);
        const movies = await res.json();

        // Group movies by VJ
        const vjMap = {};
        movies.forEach(movie => {
            if (!vjMap[movie.vj]) vjMap[movie.vj] = [];
            vjMap[movie.vj].push(movie);
        });

        const heroContainer = document.getElementById("hero");
        heroContainer.innerHTML = "<h2>Featured VJs</h2><div class='vj-scroll'></div>";

        const scrollContainer = heroContainer.querySelector(".vj-scroll");

        Object.keys(vjMap).forEach(vj => {
            const vjDiv = document.createElement("div");
            vjDiv.classList.add("vj-card");

            // Pick a poster from the first movie of that VJ as card background

            vjDiv.innerHTML = `
        <div class="vj-bg" style="background-image: url('${bgPoster}');">
          <div class="vj-overlay">
            <h3>${vj}</h3>
            <p>${vjMap[vj].length} movies</p>
          </div>
        </div>
      `;

            vjDiv.addEventListener("click", () => {
                window.location.href = `vj/vj.html?vj=${encodeURIComponent(vj)}`;
            });

            scrollContainer.appendChild(vjDiv);
        });
    } catch (err) {
        console.error("Error fetching VJs:", err);
    }
}

fetchHeroVJs();


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