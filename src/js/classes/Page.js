import { gsap } from 'gsap'
import Paragraph from '../animations/Paragraph'
import Title from '../animations/Title'
import Image from '../animations/Image'
import Projects from '../animations/Projects'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import normalizeWheel from 'normalize-wheel'
import Hammer from 'hammerjs'

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
      projectsAnimations: '[data-animation="projects"]',
      wrapperProjectsAnimation: '[data-animation="wrapper-projects"]',
      infoProjectsAnimations: '[data-animation="info-projects"]',
      imageProjectsAnimations: '[data-animation="image-projects"]',
      sourceImages: '[data-src]',
    }

    this.scroll = {
      current: 0,
      target: 0,
      last: 0,
      limit: 0,
    }

    // if (window.innerHeight > window.innerWidth) {
    //   this.manager = new Hammer(document.body)
    //   this.manager.get('pan').set({ direction: Hammer.DIRECTION_ALL })
    //   this.manager.get('swipe').set({ direction: Hammer.DIRECTION_ALL })
    // }

    this.wheelEvent = this.wheelHandler.bind(this)
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

    this.loadImages()
    this.createAnimations()
  }

  hide() {
    gsap.to(document.body, {
      duration: 0.2,
      opacity: 0,
      onComplete: () => {
        this.removeWheel()
      },
    })
  }

  show() {
    gsap.to(document.body, {
      duration: 0.2,
      opacity: 1,
      y: 0,
      onComplete: () => {
        this.addWheel()
      },
    })
  }

  loadImages() {
    if (this.elements.sourceImages) {
      Array.from(this.elements.sourceImages).forEach((element) => {
        const src = element.getAttribute('data-src')
        element.setAttribute('src', src)
      })
    }
  }

  wheelHandler(event) {
    const normalizedValue = normalizeWheel(event)
    if (event.type === 'wheel') this.scroll.target += normalizedValue.pixelY
    else this.scroll.target -= normalizedValue.pixelY / 2
  }

  addWheel() {
    // if (window.innerHeight > window.innerWidth) {
    //   this.manager = new Hammer(document.body)
    //   this.manager.get('pan').set({ direction: Hammer.DIRECTION_ALL })
    //   this.manager.get('swipe').set({ direction: Hammer.DIRECTION_ALL })
    //   this.manager.on('pan press', this.wheelEvent)
    // }
    window.addEventListener('wheel', this.wheelEvent)
  }

  removeWheel() {
    window.removeEventListener('wheel', this.wheelEvent)
  }

  resizeHandler() {
    if (this.elements.wrapper)
      this.scroll.limit = Math.abs(document.body.scrollHeight - window.innerHeight)

    if (this.elements.horizontalWrapper)
      this.scroll.limit = Math.abs(document.body.scrollWidth - window.innerWidth)
  }

  updateHandler() {
    this.scroll.target = gsap.utils.clamp(0, this.scroll.limit, this.scroll.target)

    this.scroll.current = gsap.utils.interpolate(this.scroll.current, this.scroll.target, 0.1)
    if (this.scroll.current < 0.01) this.scroll.current = 0

    if (this.elements.wrapper) {
      document.body.style.transform = `translateY(-${this.scroll.current}px)`
    }

    if (this.elements.horizontalWrapper) {
      this.elements.horizontalWrapper.style.transform = `translateX(-${this.scroll.current}px)`
    }

    this.scrollerProxyHandler()
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

    if (
      this.elements.projectsAnimations &&
      this.elements.wrapperProjectsAnimation &&
      this.elements.infoProjectsAnimations &&
      this.elements.imageProjectsAnimations
    ) {
      this.projectsAnimations = new Projects({
        element: this.elements.projectsAnimations,
        elements: {
          wrapper: [...this.elements.wrapperProjectsAnimation],
          info: [...this.elements.infoProjectsAnimations],
          image: [...this.elements.imageProjectsAnimations],
        },
      })
    }
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
