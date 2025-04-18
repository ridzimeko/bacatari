import websites from '@/filters/websites'

export const getCurrentHostname = async () => {
  const tabs = await browser.tabs.query({ active: true, currentWindow: true })
  return new URL(tabs[0].url || '').hostname
}

export const getBcConfig = async () => {
  return await browser.storage.local.get('bacatariConfig').then((result) => {
    return result.bacatariConfig
  })
}

export const currentMatchWebsite = (url: URL) => {
  return websites.filter((website) => url.hostname.includes(website.domain))?.[0]
}
