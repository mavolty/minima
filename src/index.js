import Home from './js/pages/Home'
import About from './js/pages/About'
import Projects from './js/pages/Projects'
import Detail from './js/pages/Detail'
import Contact from './js/pages/Contact'
import Preloader from './js/components/Preloader'
import Navigation from './js/components/Navigation'
import Canvas from './js/classes/Canvas'
import normalizeWheel from 'normalize-wheel'

class App {
  constructor() {
    this.createContent()
    this.createPreloader()
    this.createPage()
    this.createNavigation()
    this.createCanvas()

    this.addLink()
    this.addResize()
    this.addWheel()
    this.onUpdate()
  }

  createCanvas() {
    this.canvas = new Canvas()
  }

  createNavigation() {
    this.navigation = new Navigation({ template: this.template })
    this.navigation.elements.toggle.addEventListener('click', this.navigationHandler.bind(this))
  }

  createPreloader() {
    this.preloader = new Preloader()
    this.preloader.once('completed', this.preloadHandler.bind(this))
  }

  navigationHandler() {
    this.navigation.elements.toggle.classList.contains('navigation__label--active')
      ? this.page.removeWheel()
      : this.page.addWheel()
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
    if (this.navLink) setTimeout(() => this.page.hide(), 800)
    else this.page.hide()

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
        const { target } = event
        this.navLink = target.classList.contains('menu__link')

        this.linkHandler(target.href)
      }
    })
  }

  addResize() {
    window.addEventListener('resize', this.onResize.bind(this))

    window.addEventListener('mouseup', this.onScrollUp.bind(this))
    window.addEventListener('mousedown', this.onScrollDown.bind(this))
    window.addEventListener('mousemove', this.onScrollMove.bind(this))

    window.addEventListener('touchup', this.onScrollUp.bind(this))
    window.addEventListener('touchdown', this.onScrollDown.bind(this))
    window.addEventListener('touchmove', this.onScrollMove.bind(this))
  }

  addWheel() {
    window.addEventListener('wheel', this.onWheel.bind(this))
  }

  removeWheel() {
    window.removeEventListener('wheel', this.onWheel.bind(this))
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

  onWheel(event) {
    const normalized = normalizeWheel(event)
    if (this.page && this.page.wheelHandler) this.page.wheelHandler(normalized)

    if (this.canvas && this.canvas.wheelHandler) this.canvas.wheelHandler(normalized)
  }

  onScrollUp(event) {
    if (this.canvas && this.canvas.scrollUpHandler) this.canvas.scrollUpHandler(event)
  }

  onScrollDown(event) {
    if (this.canvas && this.canvas.scrollDownHandler) this.canvas.scrollDownHandler(event)
  }

  onScrollMove(event) {
    if (this.canvas && this.canvas.scrollMoveHandler) this.canvas.scrollMoveHandler(event)
  }
}

new App()
