require('dotenv').config()

const fetch = require('node-fetch')
const prismic = require('@prismicio/client')

const accessToken = process.env.PRISMIC_ACCESS_TOKEN
const endpoint = process.env.PRISMIC_END_POINT

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
