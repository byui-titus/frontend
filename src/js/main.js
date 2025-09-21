const API_URL = "https://backend-xhkx.onrender.com/Movie";

async function fetchMovies() {
    const res = await fetch(API_URL);
    const movies = await res.json();

    const container = document.getElementById("movies");
    container.innerHTML = "";

    movies.forEach(movie => {
        const card = document.createElement("div");
        card.classList.add("movie-card");

        card.innerHTML = `
      <img src="${movie.poster}" alt="${movie.title}" />
      <h3>${movie.title}</h3>
    `;

        // Click -> details page
        card.addEventListener("click", () => {
            window.location.href = `detail/details.html?id=${movie._id}`;
        });

        container.appendChild(card);
    });
}

fetchMovies();