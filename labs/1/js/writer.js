import getLocalSotrageItemAsString from './util.js'
import Note from './note.js'

function createTextAreaContainer() {
  const mainDiv = document.getElementById('main')
  const newNote = new Note('', mainDiv)
  newNote.addNoteToParentContainer()
}

function saveNotes() {
  const textareas = document.querySelectorAll('textarea')
  const notes = []
  textareas.forEach(textarea => {
    notes.push(new Note(textarea.value))
  })

  const JSONnotes = JSON.stringify(notes)

  if (JSONnotes !== localStorage.getItem('notes')) {
    localStorage.setItem('notes', JSONnotes)
    const lastSavedTime = new Date().toLocaleTimeString()
    document.getElementById('lastSavedTime').textContent = lastSavedTime
  }

}

function loadNotes() {
  const savedNotes = getLocalSotrageItemAsString('notes')
  if (savedNotes) {
    savedNotes.map(note => {
      const textareas = document.querySelectorAll('textarea')
      const lastTextArea = textareas[textareas.length - 1]
      lastTextArea.value = note.value
    })
  }
}

function initializePage(){
  const addBtn = document.getElementById('add')
  addBtn.addEventListener('click', createTextAreaContainer)
  const savedNotes = getLocalSotrageItemAsString('notes')
  if (savedNotes){
    savedNotes.map(note => {
      createTextAreaContainer()
      const textareas = document.querySelectorAll('textarea')
      const lastTextArea = textareas[textareas.length - 1]
      lastTextArea.value = note.value
    })
  } else{
    createTextAreaContainer()
  }
}


initializePage()

setInterval(saveNotes, 2000)
setInterval(loadNotes, 2000)



