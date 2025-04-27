const websites = [
  {
    domain: 'detik.com',
    articlePath: /\/[a-z\-]+\/d-\d+\/.+/,
  },
  {
    domain: 'kompas.com',
    articlePath: /\/read\/\d{4}\/\d{2}\/\d{2}\/.+/,
  },
  {
    domain: 'cnnindonesia.com',
    articlePath: /\/[a-z\-]+\/[\d\-]+\/.+/,
  },
  {
    domain: 'tribunnews.com',
    articlePath: /\/[a-z\-]+\/\d{4}\/\d{2}\/\d{2}\/.+/,
  },
  {
    domain: 'liputan6.com',
    articlePath: /\/[a-z\-]+\/read\/\d+\/.+/,
  },
  {
    domain: 'suara.com',
    articlePath: /\/[a-z\-]+\/\d{4}\/\d{2}\/\d{2}\/.+/,
  },
  {
    domain: 'antaranews.com',
    articlePath: /\/(berita|infografik)\/\d+\/.+/,
  },
]

export default websites
