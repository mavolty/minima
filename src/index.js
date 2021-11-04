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

    this.addLink()
    this.createPreloader()
    this.update()
  }

  createPreloader() {
    this.preloader = new Preloader()
    this.preloader.once('completed', this.preloadHandler.bind(this))
  }

  preloadHandler() {
    console.log('100% Loaded')

    this.preloader.destroy()
    this.resize()
    this.page.show()
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
    this.page.hide()
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
      this.resize()
      this.page.show()

      this.addLink()
    } catch (error) {
      console.error(error)
    }
  }

  addLink() {
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

  resize() {
    if (this.page && this.page.resizeHandler) this.page.resizeHandler()
  }

  update() {
    if (this.page && this.page.updateHandler) this.page.updateHandler()

    this.reqAnimation = window.requestAnimationFrame(this.update.bind(this))
  }
}

new App()
