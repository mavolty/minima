import Page from '../../classes/Page'

class About extends Page {
  constructor() {
    super({
      id: 'about',
      element: '.about',
      elements: {
        navigation: document.querySelector('.navbar'),
      },
    })
  }
}

export default About
