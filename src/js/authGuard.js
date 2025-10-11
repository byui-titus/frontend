// Protects pages that require login
export function requireAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Please login to continue.');
        window.location.href = '/login/login.html';
    }
}