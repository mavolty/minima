import Page from '../../classes/Page'

class About extends Page {
  constructor() {
    super({
      id: 'about',
      element: '.about',
      elements: {
        wrapper: '.about__wrapper',
        navigation: document.querySelector('.navigation'),
      },
    })
  }
}

export default About
