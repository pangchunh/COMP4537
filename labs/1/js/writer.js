import { getLocalSotrageItemAsObject, notesValueEqual } from './util.js'
import Note from './note.js'

function createTextAreaContainer() {
  const mainDiv = document.getElementById('main')
  const newNote = new Note('', mainDiv)
  newNote.addNoteToParentContainer()
}

function saveNotes() {
  const textareas = document.querySelectorAll('textarea')

  if (textareas.length === 0) {
    localStorage.setItem('notes', JSON.stringify([]))
  }

  const mainDiv = document.getElementById('main')
  const currentNotes = []
  textareas.forEach(textarea => {
    currentNotes.push(new Note(textarea.value, mainDiv))
  })
  const storedNotes = localStorage.getItem('notes')
  const storedJSONnotes = JSON.parse(storedNotes)
  const currentJSONnotes = JSON.stringify(currentNotes)
  if (!notesValueEqual(currentNotes, storedJSONnotes)) {
    localStorage.setItem('notes', currentJSONnotes)
    const lastSavedTime = new Date().toLocaleTimeString()
    updateLastSavedTime(lastSavedTime)
  }

}

function updateLastSavedTime(time) {
  document.getElementById('lastSavedTime').textContent = time
  localStorage.setItem('lastSavedTime', time)

}

function loadNotes() {
  const savedNotes = getLocalSotrageItemAsObject('notes')
  if (savedNotes) {
    savedNotes.map(note => {
      const textareas = document.querySelectorAll('textarea')
      const lastTextArea = textareas[textareas.length - 1]
      lastTextArea.value = note.value
    })
  }
}

function initializePage() {
  const addBtn = document.getElementById('add')
  addBtn.addEventListener('click', createTextAreaContainer)
  const savedNotes = getLocalSotrageItemAsObject('notes')
  if (savedNotes) {
    savedNotes.map(note => {
      createTextAreaContainer()
      const textareas = document.querySelectorAll('textarea')
      const lastTextArea = textareas[textareas.length - 1]
      lastTextArea.value = note.value
      document.getElementById('lastSavedTime').textContent = localStorage.getItem('lastSavedTime')

    })
  } else {
    createTextAreaContainer()
  }
}


initializePage()

setInterval(saveNotes, 2000)
// setInterval(loadNotes, 2000)



