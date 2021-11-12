require('dotenv').config()
const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const Prismic = require('@prismicio/client')
const PrismicDOM = require('prismic-dom')
const apiEndpoint = process.env.PRISMIC_END_POINT

// Link Resolver
const linkResolver = (doc) => {
  // Define the url depending on the document type
  if (doc.type === 'project') {
    return '/projects/' + doc.uid
  }

  if (doc.type === 'projects') {
    return '/projects'
  }

  if (doc.type === 'about') {
    return '/about'
  }

  if (doc.type === 'contact') {
    return '/contact'
  }

  // Default to homepage
  return '/'
}

// Initialize the prismic.io api
const initApi = (req) => {
  return Prismic.getApi(apiEndpoint, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    req,
  })
}

const requestHandler = async (api) => {
  const metadata = await api.getSingle('metadata')
  const navigation = await api.getSingle('navigation')
  const contact = await api.getSingle('contact')

  return {
    meta: metadata.data,
    navigation: navigation.data,
    contact: contact.data,
  }
}

// Middleware to inject prismic context
app.use(function (req, res, next) {
  res.locals.Link = linkResolver

  // add PrismicDOM in locals to access them in templates.
  res.locals.PrismicDOM = PrismicDOM

  next()
})

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(express.static(path.join(__dirname + '/public')))

app.get('/', async (req, res) => {
  const api = await initApi(req)
  const initial = await requestHandler(api)
  const home = await api.getSingle('home')

  res.render('pages/home', {
    home: home.data,
    ...initial,
  })
})

app.get('/about', async (req, res) => {
  const api = await initApi(req)
  const initial = await requestHandler(api)
  const about = await api.getSingle('about')
  const footer = await api.getSingle('footer')

  res.render('pages/about', {
    about: about.data,
    footer: footer.data,
    ...initial,
  })
})

app.get('/projects', async (req, res) => {
  const api = await initApi(req)
  const initial = await requestHandler(api)
  const projects = await api.query(Prismic.Predicates.at('document.type', 'project'))

  res.render('pages/projects', {
    projects: projects.results,
    ...initial,
  })
})

app.get('/projects/:uid', async (req, res) => {
  const api = await initApi(req)
  const initial = await requestHandler(api)
  const project = await api.getByUID('detail', req.params.uid)
  const footer = await api.getSingle('footer')

  res.render('pages/detail', {
    project: project.data,
    footer: footer.data,

    ...initial,
  })
})

app.get('/contact', async (req, res) => {
  const api = await initApi(req)
  const initial = await requestHandler(api)
  const contact = await api.getSingle('contact')
  const footer = await api.getSingle('footer')

  res.render('pages/contact', {
    contact: contact.data,
    footer: footer.data,
    ...initial,
  })
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
