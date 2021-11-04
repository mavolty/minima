import Home from './js/pages/Home'
import About from './js/pages/About'
import Projects from './js/pages/Projects'
import Detail from './js/pages/Detail'
import Contact from './js/pages/Contact'
import Preloader from './js/components/Preloader'

class App {
  constructor() {
    this.createContent()
    this.createPage()

    this.addLinkHandler()
    this.createPreloader()
  }

  createPreloader() {
    this.preloader = new Preloader()
    this.preloader.once('completed', () => this.preloadHandler())
  }

  preloadHandler() {
    console.log('100% Loaded')
    this.preloader.destroy()
  }

  createContent() {
    this.root = document.getElementById('root')
    this.template = this.root.getAttribute('data-template')
  }

  createPage() {
    this.pages = {
      home: new Home(),
      about: new About(),
      projects: new Projects(),
      detail: new Detail(),
      contact: new Contact(),
    }

    this.page = this.pages[this.template]
    this.page.create()
  }

  async linkHandler(target) {
    const request = await window.fetch(target)

    try {
      const html = await request.text()
      const div = document.createElement('div')
      div.innerHTML = html

      const divContent = div.querySelector('#root')
      this.root.setAttribute('data-template', divContent.getAttribute('data-template'))
      this.root.innerHTML = divContent.innerHTML

      this.page = this.pages[this.template]
      this.page.create()

      this.addLinkHandler()
    } catch (error) {
      console.error(error)
    }
  }

  addLinkHandler() {
    const links = document.querySelectorAll('a')

    links.forEach((link) => {
      link.onclick = (event) => {
        event.preventDefault()
        const {
          target: { href },
        } = event

        this.linkHandler(href)
      }
    })
  }
}

new App()
