import { Renderer, Camera, Transform } from 'ogl'
import Home from './Home'

class Canvas {
  constructor() {
    this.createRender()
    this.createCamera()
    this.createScene()
    this.createHome()
  }

  createRender() {
    this.renderer = new Renderer()
    this.gl = this.renderer.gl
    document.body.appendChild(this.gl.canvas)
  }

  createScene() {
    this.scene = new Transform()
  }

  createCamera() {
    this.camera = new Camera(this.gl)
    this.camera.position.z = 5
  }

  createHome() {
    this.home = new Home({
      gl: this.gl,
      scene: this.scene,
      size: this.size,
    })
  }

  resizeHandler() {
    this.renderer.setSize(window.innerWidth, window.innerHeight)

    this.camera.perspective({
      aspect: window.innerWidth / window.innerHeight,
    })

    const fov = (this.camera.fov * Math.PI) / 180
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z
    const width = height * this.camera.aspect

    this.size = {
      width,
      height,
    }

    this.home.onResize({ size: this.size })
  }

  updateHandler() {
    this.renderer.render({
      scene: this.scene,
      camera: this.camera,
    })
  }
}

export default Canvas
