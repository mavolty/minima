const path = require('path')
const express = require('express')

const prismicH = require('@prismicio/helpers')
const client = require('./config/prismicConfig.js')

const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname + '/dist')))

app.use((req, res, next) => {
  res.locals.ctx = {
    prismicH,
  }

  next()
})

const requestHandler = async () => {
  const metadata = await client.getSingle('metadata')
  const navigation = await client.getSingle('navigation')
  const contact = await client.getSingle('contact')
  const footer = await client.getSingle('footer')

  return {
    meta: metadata.data,
    navigation: navigation.data,
    contact: contact.data,
    footer: footer.data,
  }
}

app.get('/', async (req, res) => {
  const initial = await requestHandler()
  const home = await client.getSingle('home')

  res.render('pages/home', {
    home: home.data,
    ...initial,
  })
})

app.get('/about', async (req, res) => {
  const initial = await requestHandler()
  const about = await client.getSingle('about')

  res.render('pages/about', {
    about: about.data,
    ...initial,
  })
})

app.get('/projects', async (req, res) => {
  const initial = await requestHandler()
  const projects = await client.getAllByType('project')

  res.render('pages/projects', {
    projects,
    ...initial,
  })
})

app.get('/projects/:uid', async (req, res) => {
  const initial = await requestHandler()
  const project = await client.getByUID('project', req.params.uid)

  res.render('pages/detail', {
    project: project.data,
    ...initial,
  })
})

app.get('/contact', async (req, res) => {
  const initial = await requestHandler()
  const contact = await client.getSingle('contact')

  res.render('pages/contact', {
    contact: contact.data,
    ...initial,
  })
})

app.get('*', async (req, res) => {
  const initial = await requestHandler()

  res.render('pages/404', {
    ...initial,
  })
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
