import websites from '@/filters/websites'

export default defineBackground(() => {
  const DISABLED_SITES: string[] = []

  browser.webNavigation.onBeforeNavigate.addListener(
    async (details) => {
      if (details.frameId !== 0) return // only main frame

      const url = new URL(details.url)
      const website = currentMatchWebsite(url)
      const isCurrentlyDisabled = DISABLED_SITES.filter((site) => site.includes(url.hostname)).length > 0

      if (url.hostname.includes(website.domain)) {
        if (isCurrentlyDisabled) {
          return
        }

        // add ?page=all to the matched url
        if (url.pathname.match(website.articlePath) && !url.searchParams.has('page')) {
          url.searchParams.set('page', 'all')
          return browser.tabs.update(details.tabId, { url: url.toString() })
        }
      }
    },
    { url: [{ schemes: ['http', 'https'] }] },
  )

  browser.runtime.onMessage.addListener(async (message, sender) => {
    if (message.type === 'BC_TOGGLE_HANDLER') {
      const hostname = await getCurrentHostname()

      if (message.setToggle) {
        DISABLED_SITES.push(hostname)
      } else {
        DISABLED_SITES.splice(DISABLED_SITES.indexOf(hostname), 1)
      }

      browser.runtime.sendMessage({ type: 'BC_TOGGLE_RESPONSE', isDisabled: message.setToggle })
    } else if (message.type === 'BC_CURRENT_STATUS') {
      const hostname = await getCurrentHostname()

      browser.runtime.sendMessage({
        type: 'BC_CURRENT_STATUS_RESPONSE',
        isDisabled: DISABLED_SITES.includes(hostname),
      })
    }
  })
})
