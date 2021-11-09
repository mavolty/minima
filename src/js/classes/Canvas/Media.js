import vertex from '../../shaders/vertex.glsl'
import fragment from '../../shaders/fragment.glsl'
import { Program, Texture, Mesh } from 'ogl'

class Media {
  constructor({ image, index, gl, scene, geometry, size }) {
    this.element = image
    this.index = index
    this.gl = gl
    this.scene = scene
    this.geometry = geometry
    this.size = size

    this.createTexture()
    this.createProgram()
    this.createMesh()
  }

  createProgram() {
    this.program = new Program(this.gl, {
      vertex,
      fragment,
      uniforms: {
        tMap: { value: this.texture },
      },
    })
  }

  createTexture() {
    this.texture = new Texture(this.gl)

    this.image = new Image()
    this.image.crossOrigin = 'anonymous'
    this.image.src = this.element.getAttribute('data-src')
    this.image.onload = () => (this.texture.image = this.image)
  }

  createMesh() {
    this.mesh = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program,
    })

    this.mesh.setParent(this.scene)

    this.mesh.scale.x = 2
  }

  onResize(size) {
    this.createBounds(size)
  }

  createBounds({ size }) {
    this.size = size
    this.bounds = this.element.getBoundingClientRect()

    this.updateScale()
    this.updateX()
    this.updateY()
  }

  updateScale() {
    this.width = this.bounds.width / window.innerWidth
    this.height = this.bounds.height / window.innerHeight

    this.mesh.scale.x = this.size.width * this.width
    this.mesh.scale.y = this.size.height * this.height

    this.x = this.bounds.left / window.innerWidth
    this.y = this.bounds.top / window.innerHeight

    this.mesh.position.x = -this.size.width / 2 + this.mesh.scale.x / 2 + this.x * this.size.width

    this.mesh.position.y = this.size.height / 2 - this.mesh.scale.y / 2 - this.y * this.size.height
  }

  updateX() {}

  updateY() {}
}

export default Media
