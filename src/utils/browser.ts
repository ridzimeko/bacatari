import websites from '@/filters/websites'

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
    console.warn('Tab aktif tidak memiliki URL yang valid.')
  }

  return hostname
}

export const getBcConfig = async () => {
  return await browser.storage.local.get('bacatariConfig').then((result) => {
    return result.bacatariConfig
  })
}

export const currentMatchWebsite = (url: URL) => {
  return websites.filter((website) => url.hostname.includes(website.domain))?.[0]
}
