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
    this.extra = {
      x: 0,
      y: 0,
    }

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
        uPlaneSize: { value: [0, 0] },
        uImageSize: { value: [0, 0] },
      },
      transparent: true,
    })
  }

  createTexture() {
    this.texture = new Texture(this.gl)

    this.image = new Image()
    this.image.crossOrigin = 'anonymous'
    this.image.src = this.element.getAttribute('data-src')
    this.image.onload = () => {
      this.program.uniforms.uImageSize.value = [this.image.naturalWidth, this.image.naturalHeight]
      this.texture.image = this.image
    }
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

    this.mesh.program.uniforms.uPlaneSize.value = [this.mesh.scale.x, this.mesh.scale.y]
  }

  updateScale() {
    this.width = this.bounds.width / window.innerWidth
    this.height = this.bounds.height / window.innerHeight

    this.mesh.scale.x = this.size.width * this.width
    this.mesh.scale.y = this.size.height * this.height
  }

  updateX(x = 0) {
    this.x = (this.bounds.left + x) / window.innerWidth

    this.mesh.position.x =
      -this.size.width / 2 + this.mesh.scale.x / 2 + this.x * this.size.width + this.extra.x
  }

  updateY(y = 0) {
    this.y = (this.bounds.top + y) / window.innerHeight

    this.mesh.position.y =
      this.size.height / 2 - this.mesh.scale.y / 2 - this.y * this.size.height + this.extra.y
  }

  update(scroll) {
    if (!this.bounds) return

    this.updateX(scroll.x)
    this.updateY(scroll.y)
  }

  destroy() {
    this.scene.removeChild(this.mesh)
  }
}

export default Media
