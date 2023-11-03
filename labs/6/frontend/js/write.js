import { validate } from "../../util/validation.js";

const host = 'http://localhost:3000'

await loadLanguages()

async function loadLanguages(){
  try{
    const languageResponse = await fetch(`${host}/api/v1/languages`)
    const data = await languageResponse.json()
    if (data.error) throw Error(`${data.message}... ${data.error}`)

    const wordLanguageSelect = document.getElementById('wordLanguage')
    const definitionLanguageSelect = document.getElementById('definitionLanguage')
    for(const languages of data.rows){
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
  } catch(error){
    document.getElementById('feedback').innerHTML = error
  }
}




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
    

    try{
      if (!validate(word)){
        throw new Error('Input word should not contain numbers or empty spaces')
      }
      const res = await fetch(`${host}/api/v1/definition/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ word, definition, 'word-language': wordLanguage, 'definition-language': definitionLanguage })
    })


    const resText = await res.json()
    if (res.status === 409){
      displayPatchForm(resText.message)
    }
    feedback.innerHTML = `Message: ${resText.message}<br>Entry:${resText.entry}<br>Total:${resText.total}`
    
    }catch(e){
      feedback.textContent = `Error: ${e.message}`
    }
});




function displayPatchForm(message){
  const patchForm = document.getElementById('patchForm')
  const patchMessage = document.getElementById('patchMessage')
  patchForm.style.display = "block"
  patchMessage.innerHTML = `${message}. Do you want to update the current entry?`
}