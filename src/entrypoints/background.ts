export default defineBackground(() => {
  /**
   * Handler saat navigasi dimulai
   */
  const handleBeforeNavigate = async (details: Browser.webNavigation.WebNavigationParentedCallbackDetails) => {
    if (details.frameId !== 0) return // only main frame

    const originalUrl = details.url
    const url = new URL(originalUrl)
    const website = currentMatchWebsite(url)
    const config = await getBcConfig()

    if (!website || (!url.hostname.includes(website.domain) && !url.pathname.match(website.articlePath))) {
      return
    }

    // Copy URL sebelum diubah
    const updatedUrl = new URL(url.toString())

    switch (config.showFullArticle) {
      case true:
        if (!updatedUrl.searchParams.has('page')) {
          updatedUrl.searchParams.set('page', 'all')
        }
        break
      default:
        if (updatedUrl.searchParams.has('page')) {
          updatedUrl.searchParams.delete('page')
        }
        break
    }

    // Hanya update tab kalau URL berubah
    if (updatedUrl.toString() !== originalUrl) {
      return browser.tabs.update(details.tabId, { url: updatedUrl.toString() })
    }
  }

  browser.webNavigation.onBeforeNavigate.addListener(handleBeforeNavigate, {
    url: [{ schemes: ['http', 'https'] }],
  })
})
