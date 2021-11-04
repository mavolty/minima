import EventEmitter from 'events'

class Component extends EventEmitter {
  constructor({ id, element, elements }) {
    super()

    this.id = id
    this.selector = element
    this.selectorChildren = elements

    this.create()
  }

  create() {
    this.element = document.querySelector(this.selector)
    this.elements = {}

    for (let [key, entry] of Object.entries(this.selectorChildren)) {
      if (
        entry instanceof window.HTMLElement ||
        entry instanceof window.NodeList ||
        Array.isArray(entry)
      ) {
        this.elements[key] = entry
      } else {
        this.elements[key] = document.querySelectorAll(entry)

        if (this.elements[key].length === 0) this.elements[key] = null
        else if (this.elements[key].length === 1) this.elements[key] = document.querySelector(entry)
      }
    }
  }

  addEventHandler() {}

  removeEventHandler() {}
}

export default Component
