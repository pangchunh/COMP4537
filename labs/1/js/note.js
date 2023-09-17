export default class Note {
  constructor(value, parentContainer) {
    this.value = value
    this.parentContainer = parentContainer
    this.container = document.createElement('div')
    this.removeButton = document.createElement('button')
    this.textArea = document.createElement('textarea')
    this.container.className = 'textarea-content'
    this.removeButton.textContent = 'remove'
    this.removeButton.addEventListener('click', () => this.removeNote())
    this.initNote()
    this.textArea.value = this.value
  }

  getNoteValue() {
    return this.value
  }

  addNoteToParentContainer() {
    this.parentContainer.appendChild(this.container)
  }

  removeNote() {
    this.container.remove()
  }

  initNote() {
    this.container.appendChild(this.textArea)
    this.container.appendChild(this.removeButton)
  }

}