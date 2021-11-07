import Component from '../classes/Component'
import { gsap } from 'gsap'

class Navigation extends Component {
  constructor({ template }) {
    super({
      element: '.navigation',
      elements: {
        menu: '.menu',
        items: '.menu__item',
        links: '.menu__link',
        toggle: '.navigation__label',
      },
    })

    this.activePageHandler(template)
    this.toggleHandler()
  }

  activePageHandler(template) {
    this.elements.items.forEach((item) => {
      if (template === 'detail') {
        item.getAttribute('data-item') === 'projects' && item.classList.add('menu__item--active')
      } else if (item.getAttribute('data-item') === template) {
        item.classList.add('menu__item--active')
      } else {
        item.classList.remove('menu__item--active')
      }
    })
  }

  toggleHandler() {
    this.elements.toggle.addEventListener('click', () => {
      this.elements.toggle.classList.toggle('navigation__label--active')
      if (this.elements.toggle.classList.contains('navigation__label--active')) {
        gsap.to(this.elements.menu, {
          duration: 1.5,
          y: '0%',
          ease: 'power3.out',
        })
      } else {
        gsap.to(this.elements.menu, {
          duration: 1.5,
          y: '-100%',
          ease: 'power3.out',
        })
      }
    })

    this.elements.items.forEach((item) => {
      item.addEventListener('click', () => {
        if (this.elements.toggle.classList.contains('navigation__label--active')) {
          this.elements.toggle.classList.remove('navigation__label--active')
          gsap.to(this.elements.menu, {
            duration: 1.5,
            y: '-100%',
            ease: 'power3.out',
          })
        }
      })
    })
  }
}

export default Navigation
