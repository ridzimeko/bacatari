export default defineBackground(() => {
  /**
   * Handler saat navigasi dimulai
   */
  const handleBeforeNavigate = async (details: Browser.webNavigation.WebNavigationParentedCallbackDetails) => {
    if (details.frameId !== 0) return // only main frame

    const url = new URL(details.url)
    const website = currentMatchWebsite(url)
    const config = await getBcConfig()

    if (!config.showFullArticle) return
    if (!url.hostname.includes(website?.domain)) return

    // Tambah ?page=all jika cocok path artikel & belum ada query
    if (url.pathname.match(website.articlePath) && !url.searchParams.has('page')) {
      url.searchParams.set('page', 'all')
      return browser.tabs.update(details.tabId, { url: url.toString() })
    }
  }

  browser.webNavigation.onBeforeNavigate.addListener(handleBeforeNavigate, {
    url: [{ schemes: ['http', 'https'] }],
  })
})
