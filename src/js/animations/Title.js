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

    this.setAnimation()
    this.createAnimation()
  }

  setAnimation() {
    this.chars.forEach((char, index) => {
      gsap.set(char, {
        autoAlpha: 0,
      })
    })
  }

  createAnimation() {
    this.chars.forEach((char, index) => {
      gsap.from(char, {
        autoAlpha: 0,
        y: '100%',
      })

      gsap.to(char, {
        scrollTrigger: {
          trigger: this.element,
        },
        autoAlpha: 1,
        y: '0',
        delay: index * 0.02,
        duration: 1.5,
        ease: 'power3.inOut',
      })
    })
  }
}

export default Title
