import vertex from '../../shaders/vertex.glsl'
import fragment from '../../shaders/fragment.glsl'
import { Program, Texture, Mesh } from 'ogl'

class Media {
  constructor({ image, index, gl, scene, geometry }) {
    this.element = image
    this.index = index
    this.gl = gl
    this.scene = scene
    this.geometry = geometry

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

    this.mesh.position.x += this.index * this.mesh.scale.x
  }
}

export default Media
