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

    if (!url.hostname.includes(website?.domain ?? '')) return
    if (!url.pathname.match(website?.articlePath ?? '')) return

    // Copy URL sebelum diubah
    const updatedUrl = new URL(url.toString())

    switch (config.showFullArticle) {
      case true:
        if (website?.fullArticle?.type === 'query') {
          if (!updatedUrl.searchParams.has(website?.fullArticle?.key ?? '')) {
            updatedUrl.searchParams.set(website?.fullArticle?.key ?? '', website?.fullArticle?.value ?? '')
          }
        } else if (website?.fullArticle?.type === 'path') {
          const suffix = website?.fullArticle?.suffix ?? ''
          if (!updatedUrl.pathname.includes(suffix)) {
            updatedUrl.pathname += suffix
          }
        } else {
          // fallback to ?page=all
          if (!updatedUrl.searchParams.has('page')) {
            updatedUrl.searchParams.set('page', 'all')
          }
        }
        break
      default:
        if (website?.fullArticle?.type === 'query') {
          if (updatedUrl.searchParams.has(website?.fullArticle?.key ?? '')) {
            updatedUrl.searchParams.delete(website?.fullArticle?.key ?? '')
          }
        } else {
          if (updatedUrl.searchParams.has('page')) {
            updatedUrl.searchParams.delete('page')
          }
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
