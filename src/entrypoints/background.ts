export default defineBackground(() => {
  const DISABLED_SITES: Set<string> = new Set()

  /**
   * Cek apakah situs sedang dinonaktifkan
   */
  const isDisabledSite = (hostname: string): boolean => {
    const rootDomain = getRootDomain(hostname)
    return Array.from(DISABLED_SITES).some((site) => site.includes(rootDomain))
  }

  function getRootDomain(hostname: string): string {
    const parts = hostname.split('.')
    if (parts.length <= 2) {
      return hostname
    }
    return parts.slice(-2).join('.') // ambil dua bagian terakhir
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
  const handleMessage = async (message: any, sender: any, sendResponse: any) => {
    const hostname = await getCurrentHostname()

    if (hostname === 'localhost') {
      // TODO: send tooltip error
      return
    }

    const rootDomain = getRootDomain(hostname)

    switch (message.type) {
      case 'BC_TOGGLE_HANDLER':
        if (message.setToggle) {
          DISABLED_SITES.add(rootDomain)
        } else {
          DISABLED_SITES.delete(rootDomain)
        }

        browser.runtime.sendMessage({ type: 'BC_CURRENT_STATUS', status: message.setToggle })

      case 'BC_CURRENT_STATUS':
        return browser.runtime.sendMessage({
          type: 'BC_CURRENT_STATUS',
          status: isDisabledSite(rootDomain),
        })
    }
  }

  browser.webNavigation.onBeforeNavigate.addListener(handleBeforeNavigate, {
    url: [{ schemes: ['http', 'https'] }],
  })

  browser.runtime.onMessage.addListener(handleMessage)
})
