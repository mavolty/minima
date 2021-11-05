import Component from '../classes/Component'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

class Paragraph extends Component {
  constructor({ element, elements }) {
    super({
      element,
      elements,
    })
  }

  setAnimation() {
    gsap.set(this.element, {
      autoAlpha: 0,
      y: 50,
    })
  }

  createAnimation() {
    gsap.fromTo(
      this.element,
      {
        autoAlpha: 0,
        y: 50,
      },
      {
        scrollTrigger: {
          trigger: this.element,
          start: 'top 85%',
        },
        y: 0,
        duration: 0.8,
        autoAlpha: 1,
        ease: 'power3.inOut'
      }
    )
  }
}

export default Paragraph
