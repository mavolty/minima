import Home from './js/pages/Home'
import About from './js/pages/About'
import Projects from './js/pages/Projects'
import Detail from './js/pages/Detail'
import Contact from './js/pages/Contact'
import Preloader from './js/components/Preloader'
import Navigation from './js/components/Navigation'
import Canvas from './js/classes/Canvas'

class App {
  constructor() {
    this.createContent()
    this.createPreloader()
    this.createPage()
    this.createNavigation()
    this.createCanvas()

    this.addLink()
    this.addResize()
    this.onUpdate()
  }

  createCanvas() {
    this.canvas = new Canvas()
  }

  createNavigation() {
    this.navigation = new Navigation({ template: this.template })
    this.navigation.elements.toggle.addEventListener('click', () => {
      if (this.navigation.elements.toggle.classList.contains('navigation__label--active'))
        this.page.hide()
      else this.page.show()
    })
  }

  createPreloader() {
    this.preloader = new Preloader()
    this.preloader.once('completed', this.preloadHandler.bind(this))
  }

  preloadHandler() {
    console.log('100% Loaded')

    this.preloader.destroy()
    this.onResize()
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
      this.template = divContent.getAttribute('data-template')

      this.navigation.activePageHandler(this.template)

      this.root.setAttribute('data-template', this.template)
      this.root.innerHTML = divContent.innerHTML

      this.page = this.pages[this.template]
      this.page.create()
      this.onResize()
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

  addResize() {
    window.addEventListener('resize', this.onResize.bind(this))
  }

  onResize() {
    if (this.page && this.page.resizeHandler) this.page.resizeHandler()

    if (this.canvas && this.canvas.resizeHandler) this.canvas.resizeHandler()
  }

  onUpdate() {
    if (this.page && this.page.updateHandler) this.page.updateHandler()

    if (this.canvas && this.canvas.updateHandler) this.canvas.updateHandler()
    this.reqAnimation = window.requestAnimationFrame(this.onUpdate.bind(this))
  }
}

new App()
