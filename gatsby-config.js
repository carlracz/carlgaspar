const postCssPresetEnv = require(`postcss-preset-env`)
const postCSSNested = require('postcss-nested')
const postCSSUrl = require('postcss-url')
const postCSSImports = require('postcss-import')
const cssnano = require('cssnano')
const postCSSMixins = require('postcss-mixins')

// .env.*
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const postQuery = `
  {
    allContentfulPost {
      edges {
        node {
          title
          subtitle
          category
          slug
          published(formatString: "MMMM DD, YYYY")
          tags
        }
      }
    }
  }
`

const queries = [
  {
    query: postQuery,
    transformer: ({ data }) => data.allContentfulPost.edges
  }
]

module.exports = {
  siteMetadata: {
    title: `Carl Gaspar`,
    description: `A simple blogsite made in Gatsby by Carl Gaspar.`,
    copyrights: '',
    author: `@carlracz`,
    logo: {
      src: '',
      alt: '',
    },
    logoText: 'carl gaspar',
    defaultTheme: 'light',
    postsPerFirstPage: 10,
    postsPerPage: 15,
    showMenuItems: 4,
    menuMoreText: 'More',
    mainMenu: [
      {
        title: 'Blog',
        path: '/blog',
      },
      {
        title: 'Portfolio',
        path: '/portfolio',
      },
      {
        title: 'Contact',
        path: '/contact',
      },
      {
        title: 'Search',
        path: '/search',
      },
      {
        title: 'Tags',
        path: '/tags',
      },
      {
        title: 'Store [Beta]',
        path: '/store',
      },
      {
        title: 'About',
        path: '/about',
      },
      /*{
        title: 'News',
        path: '/news',
      },
      {
        title: 'Advertisement',
        path: '/advertisement',
      },*/
    ],
  },
  plugins: [
    `babel-preset-gatsby`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          postCSSUrl(),
          postCSSImports(),
          postCSSMixins(),
          postCSSNested(),
          postCssPresetEnv({
            importFrom: 'src/styles/variables.css',
            stage: 1,
            preserve: false,
          }),
          cssnano({
            preset: 'default',
          }),
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-embed-video',
            options: {
              related: false,
              noIframeBorder: true,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              quality: 100,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-carl-gaspar`,
        short_name: `carl-gaspar`,
        start_url: `/`,
        background_color: `#292a2d`,
        theme_color: `#292a2d`,
        display: `minimal-ui`,
        icon: `src/images/hello-icon.png`,
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `l0jdzkx18jtc`,
        accessToken: `1Rx2W23IYyc_B73M44PYeW66fQWHhuFc5Y-rI3SCtWU`, //process.env.CONTENTFUL_ACCESS_TOKEN,
      }
    },
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_API_KEY,
        indexName: process.env.ALGOLIA_INDEX_NAME,
        queries,
        chunkSize: 1000,
      },
    },
    `gatsby-plugin-stripe`,
    {
      resolve: `gatsby-source-stripe`,
      options: {
        objects: ['Sku'],
        secretKey: `rk_test_CLmfEkM0AI022ZONCBKEujV2002fISiJXh`, //process.env.STRIPE_RESTRICTED_KEY,
        downloadFiles: true,
      }
    },
  ],
}
