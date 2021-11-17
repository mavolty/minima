import { Renderer, Camera, Transform } from 'ogl'
import Home from './Home'

class Canvas {
  constructor({ template }) {
    this.createRender()
    this.createCamera()
    this.createScene()
    this.resizeHandler()
    this.onChange(template)

    this.x = {
      start: 0,
      end: 0,
      distance: 0,
    }

    this.y = {
      start: 0,
      end: 0,
      distance: 0,
    }
  }

  createRender() {
    this.renderer = new Renderer({
      alpha: true,
    })
    this.gl = this.renderer.gl
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
    document.body.appendChild(this.gl.canvas)
  }

  destroyHome() {
    if (!this.home) return

    this.home.destroy()
    this.home = null
    document.body.removeChild(this.gl.canvas)
  }

  onChange(template) {
    if (template === 'home') {
      this.createHome()
    } else {
      this.destroyHome()
    }
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

    if (this.home)
      this.home.onResize({
        size: this.size,
      })
  }

  updateHandler() {
    if (this.home) this.home.update()

    this.renderer.render({
      scene: this.scene,
      camera: this.camera,
    })
  }

  wheelHandler(event) {
    if (this.home) this.home.onWheel(event)
  }

  scrollUpHandler(event) {
    this.isDown = false
    const x = event.changedTouches ? event.changedTouches[0].clientX : event.clientX
    const y = event.changedTouches ? event.changedTouches[0].clientY : event.clientY

    this.x.end = x
    this.y.end = y

    if (this.home)
      this.home.onScrollUp({
        x: this.x,
        y: this.y,
      })
  }

  scrollDownHandler(event) {
    this.isDown = true
    this.x.start = event.touches ? event.touches[0].clientX : event.clientX
    this.y.start = event.touches ? event.touches[0].clientY : event.clientY

    if (this.home)
      this.home.onScrollDown({
        x: this.x,
        y: this.y,
      })
  }

  scrollMoveHandler(event) {
    if (!this.isDown) return
    const x = event.touches ? event.touches[0].clientX : event.clientX
    const y = event.touches ? event.touches[0].clientY : event.clientY

    this.x.end = x
    this.y.end = y

    if (this.home)
      this.home.onScrollMove({
        x: this.x,
        y: this.y,
      })
  }
}

export default Canvas
