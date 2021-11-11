import { gsap } from 'gsap'
import Paragraph from '../animations/Paragraph'
import Title from '../animations/Title'
import Image from '../animations/Image'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

class Page {
  constructor({ id, element, elements }) {
    this.id = id
    this.selector = element
    this.selectorChildren = {
      ...elements,
      titleAnimations: '[data-animation="title"]',
      paragraphAnimations: '[data-animation="paragraph"]',
      imageAnimations: '[data-animation="image"]',
      sourceImages: '[data-src]',
    }

    this.scroll = {
      current: 0,
      target: 0,
      last: 0,
      limit: 0,
    }

    this.mouseEvent = this.scrollHandler.bind(this)
  }

  create() {
    this.element = document.querySelector(this.selector)
    this.elements = {}

    this.scroll = {
      current: 0,
      target: 0,
      last: 0,
      limit: 0,
    }

    for (let [key, entry] of Object.entries(this.selectorChildren)) {
      if (
        entry instanceof window.HTMLElement ||
        entry instanceof window.NodeList ||
        Array.isArray(entry)
      ) {
        this.elements[key] = entry
      } else {
        this.elements[key] = document.querySelectorAll(entry)

        if (this.elements[key].length === 0) this.elements[key] = null
        else if (this.elements[key].length === 1) this.elements[key] = document.querySelector(entry)
      }
    }

    this.createAnimations()
    this.loadImages()
  }

  hide() {
    console.log('hide')
    this.removeScrolling()
  }

  show() {
    console.log('show')
    this.addScrolling()
  }

  loadImages() {
    if (this.elements.sourceImages) {
      Array.from(this.elements.sourceImages).forEach((element) => {
        const src = element.getAttribute('data-src')
        element.setAttribute('src', src)
      })
    }
  }

  resizeHandler() {
    if (this.elements.wrapper)
      this.scroll.limit = Math.abs(document.body.scrollHeight - window.innerHeight)
  }

  updateHandler() {
    this.scroll.target = gsap.utils.clamp(0, this.scroll.limit, this.scroll.target)

    this.scroll.current = gsap.utils.interpolate(this.scroll.current, this.scroll.target, 0.1)
    if (this.scroll.current < 0.01) this.scroll.current = 0

    if (this.elements.wrapper) {
      document.body.style.transform = `translateY(-${this.scroll.current}px)`
    }

    this.scrollerProxyHandler()
  }

  scrollHandler(event) {
    const { deltaY } = event

    this.scroll.target += deltaY
  }

  addScrolling() {
    window.addEventListener('wheel', this.mouseEvent)
  }

  removeScrolling() {
    window.removeEventListener('wheel', this.mouseEvent)
  }

  createAnimations() {
    if (this.elements.titleAnimations)
      this.titleAnimations = Array.from(this.elements.titleAnimations).map(
        (element) => new Title({ element })
      )

    if (this.elements.paragraphAnimations)
      this.paragraphAnimations = Array.from(this.elements.paragraphAnimations).map(
        (element) => new Paragraph({ element })
      )

    if (this.elements.imageAnimations)
      this.imageAnimations = Array.from(this.elements.imageAnimations).map(
        (element) => new Image({ element })
      )
  }

  scrollerProxyHandler() {
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length) document.documentElement.scrollTop = value
        return document.documentElement.scrollTop
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
      },
    })

    ScrollTrigger.refresh()
  }
}

export default Page
