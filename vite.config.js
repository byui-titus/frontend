import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
    plugins: [
        eslint({
            // ESLint configuration
            lintOnStart: true, // Lint on start
            formatter: 'stylish', // Specify formatter
        }),
    ],
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
            },
        },
    },
});