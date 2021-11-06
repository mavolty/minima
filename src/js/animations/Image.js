import Component from '../classes/Component'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

class Image extends Component {
  constructor({ element, elements }) {
    super({
      element,
      elements,
    })

    this.createAnimation()
  }

  setAnimation() {
    gsap.set(this.element, {
      clipPath: 'inset(100% 0 0 0)',
    })
  }

  createAnimation() {
    gsap.fromTo(
      this.element,
      {
        clipPath: 'inset(100% 0 0 0)',
      },
      {
        scrollTrigger: {
          trigger: this.element,
          start: 'top bottom',
        },
        clipPath: 'inset(0% 0 0 0)',
        duration: this.element.clientHeight / 250,
        ease: 'power3.inOut',
      }
    )
  }
}

export default Image
