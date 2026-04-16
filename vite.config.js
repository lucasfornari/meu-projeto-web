import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main:        resolve(__dirname, "web/index.html"),
                produtos:    resolve(__dirname, "web/produtos.html"),
                contato:     resolve(__dirname, "web/contato.html"),
                depoimentos: resolve(__dirname, "web/depoimentos.html"),
                compra:      resolve(__dirname, "web/compra.html"),
            },
        },
    },
});
