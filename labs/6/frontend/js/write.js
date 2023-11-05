
const host = 'http://localhost:3000'

loadPage()
await loadLanguages()

function loadPage() {
  const storeForm = document.getElementById('storeForm');
  const feedback = document.getElementById('feedback');
  storeForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const word = document.getElementById('word').value;
    const definition = document.getElementById('definition').value;
    const wordLanguageSelect = document.getElementById('wordLanguage')
    const wordLanguage = wordLanguageSelect.value
    const definitionLanguageSelect = document.getElementById('definitionLanguage')
    const definitionLanguage = definitionLanguageSelect.value

    try {
      const res = await fetch(`${host}/api/v1/definition/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ word, definition, 'word-language': wordLanguage, 'definition-language': definitionLanguage })
      })

      const resText = await res.json()
      if (res.status === 409) {
        displayPatchDiv(resText.message)
      }
      feedback.innerHTML = `Message: ${resText.message}<br>Entry: ${JSON.stringify(resText.entry)}<br>Total: ${resText.total}`

    } catch (e) {
      feedback.textContent = `Error: ${e.message}`
    }
  });

  const confirmPatchBtn = document.getElementById('confirmPatch')
  const declinePatchBtn = document.getElementById('declinePatch')
  confirmPatchBtn.onclick = submitPatchReq
  declinePatchBtn.onclick = declinePatchReq
}

async function loadLanguages() {
  try {
    const languageResponse = await fetch(`${host}/api/v1/languages`)
    const data = await languageResponse.json()
    if (data.error) throw Error(`${data.message}... ${data.error}`)

    const wordLanguageSelect = document.getElementById('wordLanguage')
    const definitionLanguageSelect = document.getElementById('definitionLanguage')
    for (const languages of data.rows) {
      const wordLanguageOption = document.createElement('option')
      const definitionLanguageOption = document.createElement('option')

      wordLanguageOption.value = languages.code
      wordLanguageOption.id = languages.code
      wordLanguageOption.innerHTML = languages.name
      wordLanguageSelect.appendChild(wordLanguageOption)
      definitionLanguageOption.value = languages.code
      definitionLanguageOption.id = languages.code
      definitionLanguageOption.innerHTML = languages.name
      definitionLanguageSelect.appendChild(definitionLanguageOption)
    }
  } catch (error) {
    document.getElementById('feedback').innerHTML = error
  }
}

function displayPatchDiv(message) {
  const patchDiv = document.getElementById('patchDiv')
  const patchMessage = document.getElementById('patchMessage')
  patchDiv.style.display = "block"
  patchMessage.innerHTML = `${message}. Do you want to update the current entry?`
}

async function submitPatchReq() {
  try {
    const word = document.getElementById('word').value;
    const definition = document.getElementById('definition').value;
    const res = await fetch(`${host}/api/v1/definition/${word}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ definition })
    })
    const resText = await res.json()
    feedback.innerHTML = `Message: ${resText.message}<br>Entry:${JSON.stringify(resText.entry)}<br>Total:${resText.total}`
    patchDiv.style.display = "none"
    document.getElementById('storeForm').reset()

  } catch (error) {
    feedback.innerHTML = `Error: ${error}`
  }
}

function declinePatchReq() {
  document.getElementById("storeForm").reset()
  feedback.innerHTML = 'Your word is duplicated and the definition is not being updated.'
  patchDiv.style.display = "none"

}

