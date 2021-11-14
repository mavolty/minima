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

    this.split = Splitting({ target: this.element, by: 'lines' })
    this.words = this.split[0].lines

    this.setAnimation()
    this.createAnimation()
  }

  setAnimation() {
    gsap.set(this.words, {
      autoAlpha: 0,
    })
  }

  createAnimation() {
    this.words.forEach((word, index) => {
      gsap.from(word, {
        autoAlpha: 0,
        y: '100%',
      })

      gsap.to(word, {
        scrollTrigger: {
          trigger: this.element,
        },
        delay: index * 0.2,
        duration: 1,
        autoAlpha: 1,
        ease: 'power3.inOut',
      })
    })
  }
}

export default Paragraph
