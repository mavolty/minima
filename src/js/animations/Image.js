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

    gsap.set(this.element, {
      clipPath: 'inset(100% 0 0 0)',
    })

    this.createAnimation()
  }

  createAnimation() {
    gsap.from(this.element, {
      clipPath: 'inset(100% 0 0 0)',
    })

    gsap.to(this.element, {
      scrollTrigger: {
        trigger: this.element,
        start: 'top bottom',
      },
      clipPath: 'inset(0% 0 0 0)',
      duration: (0.3 / 100) * this.element.clientHeight,
      ease: 'power3.inOut',
    })

    gsap.to(this.element, {
      scrollTrigger: {
        trigger: this.element,
        start: 'top center',
        scrub: true,
      },
      y: 15,
    })
  }
}

export default Image
