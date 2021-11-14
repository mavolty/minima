import Media from './Media'
import { Plane, Transform } from 'ogl'
import { gsap } from 'gsap'

class Home {
  constructor({ gl, scene, size }) {
    this.gl = gl
    this.imagesElement = Array.from(document.querySelectorAll('.home__media__image'))
    this.galleryElement = document.querySelector('.home__gallery')
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

  onResize(event) {
    this.images.map((image) => image.onResize(event))

    this.galleryBounds = this.galleryElement.getBoundingClientRect()

    this.size = event.size

    this.gallerySize = {
      width: (this.galleryBounds.width / window.innerWidth) * this.size.width,
      height: (this.galleryBounds.height / window.innerHeight) * this.size.height,
    }
  }

  update() {
    if (!this.galleryBounds) return

    this.x.current = gsap.utils.interpolate(this.x.current, this.x.target, this.x.lerp)
    this.y.current = gsap.utils.interpolate(this.y.current, this.y.target, this.y.lerp)

    if (this.scroll.x < this.x.current) {
      this.x.direction = 'right'
    }

    if (this.scroll.x > this.x.current) {
      this.x.direction = 'left'
    }

    if (this.scroll.y < this.y.current) {
      this.y.direction = 'top'
    }

    if (this.scroll.y > this.y.current) {
      this.y.direction = 'bottom'
    }

    this.scroll.x = this.x.current
    this.scroll.y = this.y.current

    this.images.map((image, index) => {
      const scaleX = image.mesh.scale.x / 2
      const scaleY = image.mesh.scale.y / 2

      if (this.x.direction === 'left') {
        const x = image.mesh.position.x + scaleX

        if (x < -this.size.width / 2) image.extra.x += this.gallerySize.width
      } else if (this.x.direction === 'right') {
        const x = image.mesh.position.x - scaleX

        if (x > this.size.width / 2) image.extra.x -= this.gallerySize.width
      }

      if (this.y.direction === 'top') {
        const y = image.mesh.position.y + scaleY

        if (y < -this.size.height / 2) image.extra.y += this.gallerySize.height
      } else if (this.y.direction === 'bottom') {
        const y = image.mesh.position.y - scaleY

        if (y > this.size.height / 2) image.extra.y -= this.gallerySize.height
      }

      image.update(this.scroll)
    })
  }

  onWheel({ pixelX, pixelY }) {
    this.x.target -= pixelX
    this.y.target -= pixelY
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
