import Component from '../classes/Component'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

class Projects extends Component {
  constructor({ element, elements }) {
    super({
      element,
      elements,
    })

    this.setAnimation()
    this.createAnimation()
  }

  setAnimation() {
    gsap.set(this.elements.info, {
      xPercent: 20,
    })
    gsap.set(this.elements.image, {
      clipPath: 'inset(100% 0 0 0)',
    })
  }

  createAnimation() {
    gsap.to(this.elements.image, {
      clipPath: 'inset(0% 0 0 0)',
      duration: 1,
      ease: 'power3.inOut',
    })

    this.elements.info.forEach((element) => {
      gsap.to(element, {
        scrollTrigger: {
          trigger: element,
          horizontal: true,
          start: 'left right',
          scrub: true,
        },
        xPercent: -10,
      })
    })

    this.elements.image.forEach((element) => {
      gsap.to(element, {
        scrollTrigger: {
          trigger: element,
          horizontal: true,
          start: 'left right',
          scrub: true,
        },
        force3D: true,
        transform: `translate3d(-75px, 0, 0)`,
      })
    })
  }
}
export default Projects
