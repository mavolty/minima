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

    this.split = Splitting({ target: this.element, by: 'chars' })
    this.chars = this.split[0].chars

    this.createAnimation()
  }

  createAnimation() {
    this.chars.forEach((char, index) => {
      gsap.from(char, {
        scrollTrigger: {
          trigger: this.element,
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
