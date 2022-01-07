import Component from '../classes/Component'
import gsap from 'gsap'

class Preloader extends Component {
  constructor() {
    super({
      id: 'preloader',
      element: '.preloader',
      elements: {
        title: '.preloader__title',
        images: Array.from(document.querySelectorAll('img')),
      },
    })

    this.length = 0

    this.createLoader()
  }

  createLoader() {
    this.elements.images.forEach((element) => {
      element.onload = () => this.assetsLoadedHandler()
      element.src = element.getAttribute('data-src')
    })

    if (this.elements.images.length === 0) {
      const interval = setInterval(() => {
        this.length++

        if (this.length === 10) {
          clearInterval(interval)
          this.loadedHandler()
        }
      }, 200)
    }
  }

  assetsLoadedHandler() {
    this.length++
    const value = this.length / this.elements.images.length
    const percent = Math.round(value * 100)

    this.elements.title.innerHTML = `${percent}%`

    if (value === 1) {
      this.loadedHandler()
    }
  }

  loadedHandler() {
    gsap.to(this.element, {
      duration: 0.5,
      opacity: 0,
      onComplete: () => this.emit('completed'),
    })
  }

  destroy() {
    this.element.parentNode.removeChild(this.element)
  }
}

export default Preloader
