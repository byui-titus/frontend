const backendURL = 'https://backend-xhkx.onrender.com';

if (localStorage.getItem('token')) {
    window.location.href = './index.html';
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registerForm');
    form.addEventListener('submit', async(e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const res = await fetch(`${backendURL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Registration failed');

            alert('Account created! Please login.');
            window.location.href = '/login/login.html';
        } catch (err) {
            alert(err.message);
        }
    });
});

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

    if (!loginLink || !registerLink || !logoutLink) {
        console.warn("Auth links not found in DOM yet. Retrying...");
        setTimeout(updateAuthLinks, 300); // Retry after 300ms (in case header loads slow)
        return;
    }

    if (token) {
        // Logged in
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
        // Logged out
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