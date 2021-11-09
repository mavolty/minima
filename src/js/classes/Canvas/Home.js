import Media from './Media'
import { Plane, Transform } from 'ogl'

class Home {
  constructor({ gl, scene, size }) {
    this.gl = gl
    this.imagesElement = Array.from(document.querySelectorAll('.home__media__image'))
    this.size = size
    this.group = new Transform()
    this.group.setParent(scene)

    this.createGeometry()
    this.createGallery()
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
}

export default Home
