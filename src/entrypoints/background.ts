export default defineBackground(() => {
  const DISABLED_SITES: Set<string> = new Set()

  /**
   * Cek apakah situs sedang dinonaktifkan
   */
  const isDisabledSite = (hostname: string): boolean => {
    return Array.from(DISABLED_SITES).some((site) => hostname.includes(site))
  }

  /**
   * Handler saat navigasi dimulai
   */
  const handleBeforeNavigate = async (details: Browser.webNavigation.WebNavigationParentedCallbackDetails) => {
    if (details.frameId !== 0) return // only main frame

    const url = new URL(details.url)
    const website = currentMatchWebsite(url)

    if (!url.hostname.includes(website?.domain)) return
    if (isDisabledSite(url.hostname)) return

    // Tambah ?page=all jika cocok path artikel & belum ada query
    if (url.pathname.match(website.articlePath) && !url.searchParams.has('page')) {
      url.searchParams.set('page', 'all')
      return browser.tabs.update(details.tabId, { url: url.toString() })
    }
  }

  /**
   * Handler pesan dari content atau popup
   */
  const handleMessage = async (message: any, sender: any) => {
    const hostname = await getCurrentHostname()

    switch (message.type) {
      case 'BC_TOGGLE_HANDLER':
        if (message.setToggle) {
          DISABLED_SITES.add(hostname)
        } else {
          DISABLED_SITES.delete(hostname)
        }

        browser.runtime.sendMessage({ type: 'BC_TOGGLE_HANDLER', isDisabled: message.setToggle })

      // TODO: fix bacatari disabled site status
      // case 'BC_CURRENT_STATUS':
      // return browser.runtime.sendMessage({ type: 'BC_CURRENT_STATUS', isDisabled: isDisabledSite(hostname) })
    }
  }

  browser.webNavigation.onBeforeNavigate.addListener(handleBeforeNavigate, {
    url: [{ schemes: ['http', 'https'] }],
  })

  browser.runtime.onMessage.addListener(handleMessage)
})
