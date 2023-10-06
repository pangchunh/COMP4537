document.addEventListener("DOMContentLoaded", function () {
  function retrieveNotes() {
    const notesFromStorage = JSON.parse(localStorage.getItem("notes")) || [];

    const notesDiv = document.getElementById("notes");
    notesDiv.innerHTML = '';

    notesFromStorage.forEach((noteText) => {
        const noteInput = document.createElement("textarea");
        // noteInput.type = "text"; // Set the input type to text
        noteInput.value = noteText;
        noteInput.readOnly = true; // Make the input readonly

        notesDiv.appendChild(noteInput);
    });

    const timestamp = new Date().toLocaleString();
    document.getElementById("lastRetrieved").textContent = "Last Retrieved: " + timestamp;
  }

setInterval(retrieveNotes, 2000);

retrieveNotes();


  setInterval(retrieveNotes, 2000);
});
