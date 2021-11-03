import Page from '../../classes/Page'

class Detail extends Page {
  constructor() {
    super({
      id: 'detail',
      element: '.detail',
      elements: {
        navigation: document.querySelector('.navbar'),
      },
    })
  }
}

export default Detail
