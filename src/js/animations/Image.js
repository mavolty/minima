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
          start: '10% 85%',
        },
        clipPath: 'inset(0% 0 0 0)',
        duration: 2,
        ease: 'power3.inOut',
      }
    )
  }
}

export default Image
