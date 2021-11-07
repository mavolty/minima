import Component from '../classes/Component'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Splitting from 'splitting'

gsap.registerPlugin(ScrollTrigger)

class Title extends Component {
  constructor({ element, elements }) {
    super({
      element,
      elements,
    })
  }

  setAnimation() {
    gsap.set(this.element, {
      autoAlpha: 1,
    })
  }

  createAnimation() {
    const split = Splitting({ target: this.element, by: 'chars' })

    const chars = split[0].chars

    chars.forEach((word, index) => {
      gsap.from(word, {
        scrollTrigger: {
          trigger: this.element,
          start: 'top bottom',
        },
        y: '100%',
        delay: index * 0.02,
        duration: 1.5,
        ease: 'power3.inOut',
      })
    })
  }
}

export default Title
