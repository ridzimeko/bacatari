import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: "./src",
  modules: ["@wxt-dev/module-vue"],
  manifest: {
    name: "Bacatari",
    description: "Baca berita tanpa ribet",
    version: "1.0.0",
    permissions: [
      "tabs",
      "webNavigation",
      "webRequest",
      "webRequestBlocking",
      "declarativeNetRequest",
      "activeTab",
      "storage",
    ],
    host_permissions: ["*://*/*"],
  },
});
