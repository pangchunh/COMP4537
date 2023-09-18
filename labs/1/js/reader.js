import { getLocalSotrageItemAsObject } from './util.js'

function displayNotesInReader() {
  const noteElements = document.getElementsByClassName('note')
  const currentNotes = []
  if (noteElements) {
    for (const noteElement of noteElements) {
      currentNotes.push(noteElement.textContent)
    }
  }

  const savedNotes = getLocalSotrageItemAsObject('notes')
  const savedNotesValue = savedNotes.map(note => note.value)
  if (JSON.stringify(currentNotes) !== JSON.stringify(savedNotesValue)) {
    appendNoteContent(savedNotesValue)
    const updatedReadTime = new Date().toLocaleTimeString()
    const readTimeSpan = document.getElementById('lastReadTime')
    readTimeSpan.textContent = updatedReadTime
    localStorage.setItem('lastReadUpdateTime', updatedReadTime)
  }
}

function initializePage() {
  const savedNotes = getLocalSotrageItemAsObject('notes')
  const savedNotesValue = savedNotes.map(note => note.value)
  appendNoteContent(savedNotesValue)
  const readTimeSpan = document.getElementById('lastReadTime')
  const lastReadUpdateTime = localStorage.getItem('lastReadUpdateTime')
  readTimeSpan.textContent = lastReadUpdateTime ? lastReadUpdateTime : new Date().toLocaleTimeString()

}

function appendNoteContent(notes) {
  const main_div = document.getElementById('main')
  main_div.replaceChildren()
  notes.forEach(note => {
    const newDiv = document.createElement('div')
    newDiv.className = 'note'
    newDiv.textContent = note
    main_div.appendChild(newDiv)
  })

}

initializePage()
setInterval(displayNotesInReader, 2000)