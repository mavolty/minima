import Page from '../../classes/Page'

class Projects extends Page {
  constructor() {
    super({
      id: 'projects',
      element: '.projects',
      elements: {
        navigation: document.querySelector('.navigation'),
      },
    })
  }
}

export default Projects
