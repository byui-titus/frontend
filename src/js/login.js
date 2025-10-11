if (localStorage.getItem('token')) {
    window.location.href = './index.html';
}

document.getElementById("loginForm").addEventListener("submit", async(e) => {
    e.preventDefault(); // ✅ prevent reload

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMsg = document.getElementById("errorMsg");

    try {
        const response = await fetch("https://backend-xhkx.onrender.com/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            errorMsg.textContent = data.message || "Invalid login credentials";
            return;
        }

        // ✅ Save token to localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // ✅ Redirect to home or detail page
        window.location.href = "/index.html";
    } catch (err) {
        errorMsg.textContent = "Something went wrong. Please try again.";
    }
});

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