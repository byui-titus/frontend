async function fetchMovies() {
    try {
        const response = await fetch("https://backend-xhkx.onrender.com/Movie");
        const movies = await response.json();

        // Group movies by genre
        const grouped = movies.reduce((acc, movie) => {
            const genre = movie.genre || "Other";
            if (!acc[genre]) acc[genre] = [];
            acc[genre].push(movie);
            return acc;
        }, {});

        renderMovies(grouped);
    } catch (err) {
        console.error("Error fetching movies:", err);
    }
}

function renderMovies(groupedMovies) {
    const container = document.getElementById("movies-container");
    container.innerHTML = "";

    for (const [genre, movies] of Object.entries(groupedMovies)) {
        const section = document.createElement("section");
        section.classList.add("genre-section");

        section.innerHTML = `
      <h3 class="genre-title">${genre}</h3>
      <div class="movie-grid">
        ${movies
          .map(
            (movie) => `
          <div class="movie-card" onclick="window.location.href='/detail/details.html?id=${movie._id}'">
            <img src="${movie.poster}" alt="${movie.title}">
            <h4>${movie.title}</h4>
          </div>
        `
          )
          .join("")}
      </div>
    `;
    container.appendChild(section);
  }
}

// Load movies on page load
document.addEventListener("DOMContentLoaded", fetchMovies);


async function loadPartial(id, file) {
    try {
        const response = await fetch(`/partials/${file}`);
        const content = await response.text();
        document.getElementById(id).innerHTML = content;
        if (file === "header.html") {
      updateAuthLinks();
    }
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