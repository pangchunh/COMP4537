
const notes = [];

document.addEventListener("DOMContentLoaded", function () {

  function saveNotes() {

    const textareas = document.querySelectorAll("textarea");

    notes.length = 0; 
    textareas.forEach((textarea) => {
      notes.push(textarea.value);
    });

    localStorage.setItem("notes", JSON.stringify(notes));

    const timestamp = new Date().toLocaleString();
    localStorage.setItem("timestamp", timestamp);

    document.getElementById("lastSaved").textContent = "Last Saved: " + timestamp;
  }

  function loadNotes() {
    // localStorage.clear();
    const notesFromStorage = JSON.parse(localStorage.getItem("notes"));

    const notesDiv = document.getElementById("notes");

    notesDiv.innerHTML = '';

    if (Array.isArray(notesFromStorage)) {
      notesFromStorage.forEach((noteText) => {
        const textarea = document.createElement("textarea");
        textarea.value = noteText;

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", function () {
          const indexToRemove = notes.indexOf(noteText);

          if (indexToRemove !== -1) {
            notes.splice(indexToRemove, 1);
            saveNotes();
          }
          notesDiv.removeChild(textarea);
          notesDiv.removeChild(removeButton);
        });

        notesDiv.appendChild(textarea);
        notesDiv.appendChild(removeButton);
      });
    }
  }


  // Load existing notes from local storage
  loadNotes();

  // Add note button
  document.getElementById("addNote").addEventListener("click", function () {
    const textarea = document.createElement("textarea");
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", function () {
      // Remove the textarea and its contents from local storage
      const indexToRemove = notes.indexOf(textarea.value);
      if (indexToRemove !== -1) {
        notes.splice(indexToRemove, 1);
        saveNotes();
      }
      // Remove the textarea and the remove button from the DOM
      notesDiv.removeChild(textarea);
      notesDiv.removeChild(removeButton);
    });

    const notesDiv = document.getElementById("notes");
    notesDiv.appendChild(textarea);
    notesDiv.appendChild(removeButton);

    saveNotes();
  });

  // Save notes to local storage every 2 seconds
  setInterval(saveNotes, 2000);
});