import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { defineConfig } from 'vite';

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
    root: "src",
    build: {
        outDir: "../dist",
        rollupOptions: {
            input: {
                main: resolve(__dirname, "src/index.html"),
                movieDetails: resolve(__dirname, "src/detail/details.html"),
                allMovies: resolve(__dirname, "src/all/all.html"),
                vjs: resolve(__dirname, "src/vj/vj.html"),
                clear: resolve(__dirname, "src/clear/clear.html"),
                cleard: resolve(__dirname, "src/detail/clear.html"),
                login: resolve(__dirname, "src/login/login.html"),
                register: resolve(__dirname, "src/login/register.html"),
                logout: resolve(__dirname, "src/login/logout.html"),
            },
        },
    },
});