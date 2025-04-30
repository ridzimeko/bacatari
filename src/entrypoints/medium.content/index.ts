import { waitForElement } from '@/utils/dom'
import './style.css'

const MEDIUM_DOM_CLASS = ['.speechify-ignore.bg.l', '.speechify-ignore.bh.l']

export default defineContentScript({
  matches: ['*://*/*'],
  runAt: 'document_idle',
  main() {
    function onUrlChange(callback: () => void) {
      let currentUrl = location.href

      const checkUrlChange = () => {
        if (location.href !== currentUrl) {
          currentUrl = location.href
          callback()
        }
      }

      setInterval(checkUrlChange, 1000)
      callback()
    }

    function findInjectTarget(): Element | null {
      for (const selector of MEDIUM_DOM_CLASS) {
        const el = document.querySelector(selector)
        if (el) return el
      }
      return null
    }

    function injectButton() {
      const btn = document.getElementById('bacatari-freedium-btn')
      if (btn) return

      const icon = document.createElement('div')
      icon.classList.add('medium-icon')
      icon.innerHTML = `
        <div id="bacatari-freedium-btn" role="button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 21.5c-1.35-.85-3.8-1.5-5.5-1.5c-1.65 0-3.35.3-4.75 1.05c-.1.05-.15.05-.25.05c-.25 0-.5-.25-.5-.5V6c.6-.45 1.25-.75 2-1c1.11-.35 2.33-.5 3.5-.5c1.95 0 4.05.4 5.5 1.5c1.45-1.1 3.55-1.5 5.5-1.5c1.17 0 2.39.15 3.5.5c.75.25 1.4.55 2 1v14.6c0 .25-.25.5-.5.5c-.1 0-.15 0-.25-.05c-1.4-.75-3.1-1.05-4.75-1.05c-1.7 0-4.15.65-5.5 1.5m-1-14c-1.36-.6-3.16-1-4.5-1c-1.2 0-2.4.15-3.5.5v11.5c1.1-.35 2.3-.5 3.5-.5c1.34 0 3.14.4 4.5 1zM13 19c1.36-.6 3.16-1 4.5-1c1.2 0 2.4.15 3.5.5V7c-1.1-.35-2.3-.5-3.5-.5c-1.34 0-3.14.4-4.5 1z"/></svg>
            <span>Read on Freedium</span>
        </div>`

      icon.addEventListener('click', () => {
        const url = new URL(location.href)
        freeMedium(url)
      })

      const element = findInjectTarget()
      if (element) {
        element.appendChild(icon)
      }
    }

    const isMedium =
      !!document.querySelector('meta[property="og:site_name"][content="Medium"]') &&
      !!document.querySelector('link[rel="search"][title="Medium"]')

    if (isMedium) {
      injectButton()

      onUrlChange(() => {
        console.log('Bacatari_medium - URL changed')
        waitForElement(MEDIUM_DOM_CLASS, injectButton)
      })

      return
    }
  },
})
