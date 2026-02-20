import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import tailwindcss from "@tailwindcss/vite";

const apiTarget = "https://cartogenre-uf.mastercmw.com";
const DEV_API_PREFIX = "/api";

const rewriteProxyLocation = (location) => {
    if (!location) {
        return location;
    }

    try {
        const targetOrigin = new URL(apiTarget).origin;
        const redirectUrl = new URL(location, apiTarget);

        if (redirectUrl.origin !== targetOrigin) {
            return location;
        }

        return `${DEV_API_PREFIX}${redirectUrl.pathname}${redirectUrl.search}${redirectUrl.hash}`;
    } catch {
        return location;
    }
};

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue(), vueDevTools(), tailwindcss()],
    server: {
        proxy: {
            [DEV_API_PREFIX]: {
                target: apiTarget,
                changeOrigin: true,
                secure: true,
                followRedirects: true,
                configure: (proxy) => {
                    proxy.on("proxyRes", (proxyRes) => {
                        const location = proxyRes.headers.location;
                        if (!location) {
                            return;
                        }
                        // Keep redirects on localhost so the request still goes through /api proxy.
                        proxyRes.headers.location = rewriteProxyLocation(
                            String(location)
                        );
                    });
                },
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
        },
    },
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
});
