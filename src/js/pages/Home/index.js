import Page from '../../classes/Page'

class Home extends Page {
  constructor() {
    super({
      id: 'home',
      element: '.home',
      elements: {
        navigaton: document.querySelector('.navbar'),
        link: '.home__button',
      },
    })
  }
}

export default Home
