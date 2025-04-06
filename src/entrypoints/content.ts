import websites from "@/filters/websites";
import applyAntiClipboard from "@/utils/antiClipboard";

export default defineContentScript({
  matches: ['<all_urls>'],
  runAt: 'document_start',
  main() {
    for (const website of websites) {
      if (location.hostname.includes(website.domain)) {

        // protect clipboard
        if (document.readyState === "loading") {
          document.addEventListener("DOMContentLoaded", applyAntiClipboard);
        } else {
          applyAntiClipboard();
        }

      }
    }
  },
});
