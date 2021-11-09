import Media from './Media'
import { Plane, Transform } from 'ogl'
import { gsap } from 'gsap'

class Home {
  constructor({ gl, scene, size }) {
    this.gl = gl
    this.imagesElement = Array.from(document.querySelectorAll('.home__media__image'))
    this.size = size
    this.group = new Transform()
    this.group.setParent(scene)

    this.createGeometry()
    this.createGallery()

    this.scroll = {
      x: 0,
      y: 0,
    }

    this.currentScroll = {
      x: 0,
      y: 0,
    }

    this.x = {
      current: 0,
      target: 0,
      lerp: 0.1,
    }

    this.y = {
      current: 0,
      target: 0,
      lerp: 0.1,
    }
  }

  createGallery() {
    this.images = this.imagesElement.map((image, index) => {
      return new Media({
        image,
        index,
        gl: this.gl,
        scene: this.group,
        geometry: this.geometry,
        size: this.size,
      })
    })
  }

  createGeometry() {
    this.geometry = new Plane(this.gl)
  }

  onResize(size) {
    this.images.map((image) => image.onResize(size))
  }

  update() {
    this.x.current = gsap.utils.interpolate(this.x.current, this.x.target, this.x.lerp)
    this.y.current = gsap.utils.interpolate(this.y.current, this.y.target, this.y.lerp)

    this.scroll.x = this.x.current
    this.scroll.y = this.y.current

    this.images.map((image) => image.update(this.scroll))
  }

  onScrollUp({ x, y }) {}

  onScrollDown({ x, y }) {
    this.currentScroll.x = this.scroll.x
    this.currentScroll.y = this.scroll.y
  }

  onScrollMove({ x, y }) {
    const xDistance = x.start - x.end
    const yDistance = y.start - y.end

    this.x.target = this.currentScroll.x - xDistance
    this.y.target = this.currentScroll.y - yDistance
  }
}

export default Home
