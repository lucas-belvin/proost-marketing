module.exports = {
    pathPrefix: '/',
    siteMetadata: require('./site-metadata.json'),
    plugins: [
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-plugin-segment-js`,
            options: {
                // your segment write key for your production environment
                // when process.env.NODE_ENV === 'production'
                // required; non-empty string
                prodKey: `JgeYFd2m50t8V0554cHLRRFTYFOLa9iV`,
    
                // if you have a development env for your segment account, paste that key here
                // when process.env.NODE_ENV === 'development'
                // optional; non-empty string
                devKey: `2ohIl0nFL6DP3HLAqgcELWALbgorXdcy`,
    
                // boolean (defaults to false) on whether you want
                // to include analytics.page() automatically
                // if false, see below on how to track pageviews manually
                trackPage: false
            }
        },
        `gatsby-source-data`,
        {
            resolve: `gatsby-plugin-favicon`,
            options: {
                logo: `${__dirname}/static/branding/favicon.png`,
                lang: 'en-US',
                version: '1.0',
            }
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `pages`,
                path: `${__dirname}/src/pages`,
            },
        },
        {
            resolve: `gatsby-plugin-stackbit-static-sass`,
            options: {
                inputFile: `${__dirname}/src/sass/main.scss`,
                outputFile: `${__dirname}/public/assets/css/main.css`
            },
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [`gatsby-remark-component`]
            }
        },
        {
            resolve: `gatsby-remark-page-creator`,
            options: {
                
            }
        },
        {
            resolve: `@stackbit/gatsby-plugin-menus`,
            options: {
                sourceUrlPath: `fields.url`,
                pageContextProperty: `menus`,
                menus: require('./src/data/menus.json'),
            }
        }
    ]
};
