import applyAntiClipboard from '@/utils/antiClipboard'

export default defineContentScript({
  matches: ['<all_urls>'],
  runAt: 'document_start',
  async main() {
    const config = await getBcConfig()
    const url = new URL(window.location.href)
    const website = currentMatchWebsite(url)

    if (!website) return
    if (!url.hostname.includes(website.domain)) return
    if (!url.pathname.match(website.articlePath)) return
    if (!config.antiClipboard) return

    // protect clipboard
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', applyAntiClipboard)
    } else {
      applyAntiClipboard()
    }
  },
})
