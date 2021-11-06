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

    this.createAnimation()
  }

  setAnimation() {
    gsap.set(this.element, {
      autoAlpha: 0,
    })
  }

  createAnimation() {
    const split = Splitting({ target: this.element, by: 'chars' })

    const chars = split[0].chars

    gsap.set(this.element, {
      autoAlpha: 1,
    })

    chars.forEach((word, index) => {
      gsap.from(word, {
        y: '100%',
      })

      gsap.to(word, {
        scrollTrigger: {
          trigger: this.element,
          start: 'top bottom',
        },
        delay: index * 0.02,
        y: '0%',
        duration: 1.5,
        ease: 'power3.inOut',
      })
    })
  }
}

export default Title
