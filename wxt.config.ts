import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: './src',
  modules: ['@wxt-dev/module-vue'],
  manifest: {
    name: 'Bacatari',
    description: 'Baca berita tanpa ribet',
    version: '1.0.0',
    permissions: ['tabs', 'webRequest', 'webRequestBlocking', 'declarativeNetRequest', 'activeTab'],
    host_permissions: ['*://*/*']
  }
});
