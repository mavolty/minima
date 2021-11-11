import Page from '../../classes/Page'

class Detail extends Page {
  constructor() {
    super({
      id: 'detail',
      element: '.detail',
      elements: {
        wrapper: '.detail__wrapper',
        navigation: document.querySelector('.navigation'),
        footer: '.footer__wrapper',
      },
    })
  }
}

export default Detail
