import Page from '../../classes/Page'

class Projects extends Page {
  constructor() {
    super({
      id: 'projects',
      element: '.projects',
      elements: {
        horizontalWrapper: '.projects__wrapper',
        navigation: document.querySelector('.navigation'),
      },
    })
  }
}

export default Projects
