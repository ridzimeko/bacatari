import websites from "@/filters/websites";

export default defineBackground(() => {
  browser.webNavigation.onBeforeNavigate.addListener(
    async (details) => {
      const url = new URL(details.url);

      for (const website of websites) {
        if (url.hostname.includes(website.domain)) {

          // add ?page=all to the matched url
          if (url.pathname.match(website.articlePath) && !url.searchParams.has('page')) {
            url.searchParams.set('page', 'all');
            return browser.tabs.update(details.tabId, { url: url.toString() });
          }

        }
      }
    },
    { url: [{ schemes: ['http', 'https'] }] }
  );
})