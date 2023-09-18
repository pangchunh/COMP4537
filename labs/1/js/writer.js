import getLocalSotrageItemAsString from './util.js'
import Note from './note.js'

function createTextAreaContainer() {
  const mainDiv = document.getElementById('main')
  const newNote = new Note('', mainDiv)
  newNote.addNoteToParentContainer()
}

function saveNotes() {
  const textareas = document.querySelectorAll('textarea')
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
    document.getElementById('lastSavedTime').textContent = lastSavedTime
  }

}

function notesValueEqual(a, b){
  if (!a || !b){
    return false
  }

  const firstContent = a.map(note => note.value)
  const secondContent = b.map(note => note.value)

  firstContent.sort()
  secondContent.sort()

  console.log(firstContent.every((value, index) => value === secondContent[index]))
  return firstContent.every((value, index) => value === secondContent[index])
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



