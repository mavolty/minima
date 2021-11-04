import Component from '../classes/Component'

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
  }

  assetsLoadedHandler() {
    this.length++
    const value = this.length / this.elements.images.length
    console.log(value)

    if (value === 1) {
      this.loadedHandler()
    }
  }

  loadedHandler() {
    this.emit('completed')
  }

  destroy() {
    this.element.parentNode.removeChild(this.element)
  }
}

export default Preloader
