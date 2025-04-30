export function waitForElement(selectors: string[], callback: (el: Element) => void) {
  for (const selector of selectors) {
    const target = document.querySelector(selector)
    if (target) return callback(target)

    const observer = new MutationObserver(() => {
      const el = document.querySelector(selector)
      if (el) {
        observer.disconnect()
        callback(el)
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })
  }
}
