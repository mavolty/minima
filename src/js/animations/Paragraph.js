import Component from '../classes/Component'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Splitting from 'splitting'

gsap.registerPlugin(ScrollTrigger)

class Paragraph extends Component {
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
    const split = Splitting({ target: this.element, by: 'lines' })
    const words = split[0].lines

    gsap.set(this.element, {
      autoAlpha: 1,
    })

    words.forEach((word, index) => {
      gsap.from(word, {
        autoAlpha: 0,
        y: '100%',
      })

      gsap.to(word, {
        scrollTrigger: {
          trigger: this.element,
          start: 'top bottom',
        },
        delay: index * 0.15,
        y: '0%',
        duration: 1,
        autoAlpha: 1,
        ease: 'power3.inOut',
      })
    })
  }
}

export default Paragraph
