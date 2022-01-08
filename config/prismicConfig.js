const fetch = require('node-fetch')
const prismic = require('@prismicio/client')

const repoName = 'minima-interior'
const accessToken = ''
const endpoint = prismic.getEndpoint(repoName)

const routes = [
  {
    type: 'home',
    path: '/',
  },
  {
    type: 'about',
    path: '/about',
  },
  {
    type: 'projects',
    path: '/projects',
  },
  {
    type: 'project',
    path: '/projects/:uid',
  },
  {
    type: 'contact',
    path: '/contact',
  },
]

module.exports = prismic.createClient(endpoint, {
  fetch,
  accessToken,
  routes,
})
