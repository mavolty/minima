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

    this.createAnimation()
  }

  setAnimation() {
    gsap.set(this.elements.info, {
      xPercent: 20,
    })
  }

  createAnimation() {
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
        transform: 'translate3d(-140px, 0, 0)',
      })
    })
  }
}
export default Projects
