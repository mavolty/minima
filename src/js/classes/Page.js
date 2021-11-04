import gsap from 'gsap'

class Page {
  constructor({ id, element, elements }) {
    this.id = id
    this.selector = element
    this.selectorChildren = elements
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
  }

  hide() {
    this.removeScrolling()
  }

  show() {
    this.addScrolling()
  }

  resizeHandler() {
    this.scroll.limit =
      this.elements.wrapper.clientHeight +
      this.elements.navigation.clientHeight -
      window.innerHeight
  }

  updateHandler() {
    this.scroll.target = gsap.utils.clamp(0, this.scroll.limit, this.scroll.target)
    if (this.scroll.current < 0.01) this.scroll.current = 0

    this.scroll.current = gsap.utils.interpolate(this.scroll.current, this.scroll.target, 0.1)

    if (this.elements.wrapper) {
      this.elements.wrapper.style.transform = `translateY(-${this.scroll.current}px)`
      this.elements.navigation.style.transform = `translateY(-${this.scroll.current}px)`
    }
  }

  scrollHandler(event) {
    const { deltaY } = event

    this.scroll.target += deltaY
  }

  addScrolling() {
    window.addEventListener('mousewheel', this.scrollHandler.bind(this))
  }

  removeScrolling() {
    window.removeEventListener('mousewheel', this.scrollHandler.bind(this))
  }
}

export default Page
