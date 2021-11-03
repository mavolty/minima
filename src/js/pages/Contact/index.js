import Page from '../../classes/Page'

class Contact extends Page {
  constructor() {
    super({
      id: 'contact',
      element: '.contact',
      elements: {
        navigation: document.querySelector('.navbar'),
      },
    })
  }
}

export default Contact
