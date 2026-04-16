import { defineConfig } from "vite";
import { resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main:        resolve(__dirname, "index.html"),
                produtos:    resolve(__dirname, "web/produtos.html"),
                contato:     resolve(__dirname, "web/contato.html"),
                depoimentos: resolve(__dirname, "web/depoimentos.html"),
                compra:      resolve(__dirname, "web/compra.html"),
            },
        },
    },
});
