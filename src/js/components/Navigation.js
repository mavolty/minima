import Component from '../classes/Component'
import { gsap } from 'gsap'

class Navigation extends Component {
  constructor({ template }) {
    super({
      element: '.navigation',
      elements: {
        menu: '.menu',
        menuWrapper: '.menu__wrapper',
        menuLayer: '.menu__layer',
        items: '.menu__item',
        links: '.menu__link',
        toggle: '.navigation__label',
      },
    })

    this.state = { isClicked: false }

    this.elements.toggle.addEventListener('click', this.hamburgerHandler.bind(this))
    this.elements.items.forEach((item) =>
      item.addEventListener('click', this.itemHandler.bind(this))
    )

    this.onChange(template)
  }

  onChange(template) {
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

  hamburgerHandler() {
    this.state.isClicked = !this.state.isClicked
    this.elements.toggle.classList.toggle('navigation__label--active')
    this.elements.toggle.style.pointerEvents = 'none'
    setTimeout(() => {
      this.elements.toggle.style.pointerEvents = 'auto'
    }, 1000)
    this.animation()
  }

  animation() {
    if (this.state.isClicked) {
      gsap.to(this.elements.menu, {
        duration: 0,
        css: { display: 'block' },
      })
      gsap.to([this.elements.menuWrapper, this.elements.menuLayer], {
        duration: 0,
        opacity: 1,
        height: '100%',
      })
      gsap.from([this.elements.menuLayer, this.elements.menuWrapper], {
        duration: 0.8,
        height: '0%',
        ease: 'power3.inOut',
        transformOrigin: 'right top',
        skewY: 2,
        stagger: {
          amount: 0.1,
        },
      })
    } else {
      gsap.to(this.elements.menu, {
        duration: 1,
        css: { display: 'none' },
      })
      gsap.to([this.elements.menuWrapper, this.elements.menuLayer], {
        duration: 0.8,
        height: '0%',
        ease: 'power3.inOut',
        stagger: {
          amount: 0.07,
        },
      })
    }
  }

  itemHandler() {
    this.state.isClicked = true
    this.elements.toggle.classList.remove('navigation__label--active')
    if (this.state.isClicked) {
      gsap.to(this.elements.menu, {
        duration: 1,
        css: { display: 'none' },
      })
      gsap.to([this.elements.menuWrapper, this.elements.menuLayer], {
        duration: 0.8,
        height: '0%',
        ease: 'power3.inOut',
        stagger: {
          amount: 0.07,
        },
      })
    }
    this.state.isClicked = false
  }
}

export default Navigation
