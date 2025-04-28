import websites from '@/filters/websites'

export const DEFAULT_CONFIG: BcConfig = {
  antiClipboard: true,
  showFullArticle: true,
}

export const getCurrentHostname = async (): Promise<string> => {
  const tabs = await browser.tabs.query({ active: true, currentWindow: true })
  const tabUrl = tabs[0]?.url

  let hostname = ''

  if (tabUrl && tabUrl.startsWith('http')) {
    try {
      hostname = new URL(tabUrl).hostname
    } catch (e) {
      console.error('Gagal parse URL tab:', e)
    }
  } else {
    hostname = 'localhost'
  }

  return hostname
}

export const getBcConfig = async (): Promise<BcConfig> => {
  let config = await browser.storage.local.get('bacatariConfig')
  if (!config.bacatariConfig) {
    await browser.storage.local.set({
      bacatariConfig: DEFAULT_CONFIG,
    })
    return DEFAULT_CONFIG
  }
  return config.bacatariConfig
}

export const currentMatchWebsite = (url: URL) => {
  return websites.filter((website) => url.hostname.includes(website.domain))?.[0]
}
