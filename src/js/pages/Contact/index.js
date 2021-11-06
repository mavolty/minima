import Page from '../../classes/Page'

class Contact extends Page {
  constructor() {
    super({
      id: 'contact',
      element: '.contact',
      elements: {
        wrapper: '.contact__wrapper',
        navigation: document.querySelector('.navbar'),
      },
    })
  }
}

export default Contact
