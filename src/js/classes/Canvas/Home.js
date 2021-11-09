import Media from './Media'
import { Plane, Transform } from 'ogl'

class Home {
  constructor({ gl, scene }) {
    this.gl = gl
    this.imagesElement = Array.from(document.querySelectorAll('.home__media__image'))
    this.group = new Transform()
    this.group.setParent(scene)

    this.createGeometry()
    this.createGallery()
  }

  createGallery() {
    this.imagesElement.map((image, index) => {
      return new Media({
        image,
        index,
        gl: this.gl,
        scene: this.group,
        geometry: this.geometry,
      })
    })
  }

  createGeometry() {
    this.geometry = new Plane(this.gl)
  }
}

export default Home
