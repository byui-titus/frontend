localStorage.removeItem('token');
alert('You have been logged out.');
window.location.href = '/logout/logout.html';

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