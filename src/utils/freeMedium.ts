export default function freeMedium(url: URL) {
  const originalHost = url.host
  const originalPath = url.pathname
  const redirectUrl = `https://freedium.cfd/${originalHost}${originalPath}`

  window.location.href = redirectUrl
}
