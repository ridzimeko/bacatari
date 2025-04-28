import { defineConfig } from 'wxt'

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: './src',
  modules: ['@wxt-dev/module-vue'],
  manifest: {
    name: 'Bacatari',
    description: 'Baca berita tanpa ribet. Membantu pengalaman baca kamu jadi lebih simpel, dan nyaman.',
    version: '0.9.0',
    version_name: '0.9.0-bacatari-beta',
    permissions: [
      'tabs',
      'webNavigation',
      //  -- maybe will be implemented later --
      // 'webRequest',
      // 'webRequestBlocking',
      // 'declarativeNetRequest',
      'activeTab',
      'storage',
    ],
    host_permissions: ['*://*/*'],
  },
})
