import { waitForElement } from "@/utils/dom";

export default defineContentScript({
    matches: ['*://*/*'],
    runAt: 'document_idle',
    main() {
        function onUrlChange(callback: () => void) {
            let currentUrl = location.href;

            const checkUrlChange = () => {
                if (location.href !== currentUrl) {
                    currentUrl = location.href;
                    callback();
                }
            };

            // check url change every 1 second
            setInterval(checkUrlChange, 1000);

            callback();
        }

        function injectButton() {
            const btn = document.getElementById('bacatari-freedium-btn');
            if (btn) return;

            const icon = document.createElement('div');
            icon.classList.add('medium-icon');
            icon.innerHTML = `
            <div id="bacatari-freedium-btn" style="display: flex; align-items: center; gap: 8px; margin-top: 12px; padding: 8px 12px; border-radius: 4px; background-color: #f0f0f0; cursor: pointer;">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from Iconoir by Luca Burgio - https://github.com/iconoir-icons/iconoir/blob/main/LICENSE --><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"><path d="M4 19V5a2 2 0 0 1 2-2h13.4a.6.6 0 0 1 .6.6v13.114M6 17h14M6 21h14"/><path stroke-linejoin="round" d="M6 21a2 2 0 1 1 0-4"/><path d="M9 7h6"/></g></svg>
                <span>Read on Freedium</span>
            </div>`;

            icon.addEventListener('click', () => {
                console.log('Bacatari_medium - icon clicked');
                const url = new URL(location.href);
                freeMedium(url);
            });

            const element = document.querySelector('.speechify-ignore.bh.l');
            if (element) {
                element.appendChild(icon);
            }
        }

        const isMedium = (
            !!document.querySelector('meta[content="Medium"]') &&
            !!document.querySelector('meta[property="article:published_time"]') &&
            !!document.querySelector('link[rel="author"][data-rh="true"]')
        );

        console.log('Bacatari_medium - medium content script loaded', isMedium);

        if (isMedium) {

            injectButton();

            onUrlChange(() => {
                console.log('Bacatari_medium - URL changed');
                waitForElement('.speechify-ignore.bh.l', injectButton)
            });

            return;
        };
    },
});