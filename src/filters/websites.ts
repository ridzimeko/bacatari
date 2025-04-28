const articlePath = {
  article1: /\/[a-z\-]+\/d-\d+\/.+/,
  article2: /\/read\/\d{4}\/\d{2}\/\d{2}\/.+/,
  article3: /\/[a-z\-]+\/[\d\-]+\/.+/,
  article4: /\/[a-z\-]+\/\d{4}\/\d{2}\/\d{2}\/.+/,
  article5: /\/[a-z\-]+\/read\/\d+\/.+/,
  article6: /\/(berita|infografik)\/\d+\/.+/,
  article7: /\/read\/\d{4,}\/\.+/,
  article8: /\/(read\/\d+\/|berita|([a-z\-]+\/){2,}).+/,
  article9: /\/[a-z\d\-]+\/[a-z\d]+\/.+/,
  article10: /\/([a-z\-]+\/){2,}.+/,
}

const websites = [
  {
    domain: 'detik.com',
    articlePath: articlePath.article1,
  },
  {
    domain: 'kompas.com',
    articlePath: articlePath.article2,
  },
  {
    domain: 'tribunnews.com',
    articlePath: articlePath.article4,
  },
  {
    domain: 'liputan6.com',
    articlePath: articlePath.article5,
  },
  {
    domain: 'suara.com',
    articlePath: articlePath.article4,
  },
  {
    domain: 'antaranews.com',
    articlePath: articlePath.article6,
  },
  {
    domain: 'matamata.com',
    articlePath: articlePath.article2,
  },
  {
    domain: 'okezone.com',
    articlePath: articlePath.article2,
  },
  {
    domain: 'sindonews.com',
    articlePath: articlePath.article7,
    fullArticle: {
      type: 'query',
      key: 'showpage',
      value: 'all',
    },
  },
  {
    domain: 'inews.id',
    articlePath: articlePath.article8,
    fullArticle: {
      type: 'path',
      suffix: '/all',
    },
  },
  {
    domain: 'kompasiana.com',
    articlePath: articlePath.article9,
  },
  {
    domain: 'idntimes.com',
    articlePath: articlePath.article10,
  },
]

export default websites
