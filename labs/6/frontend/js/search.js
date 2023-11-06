
const host = 'https://chuncody-lab6.onrender.com'

const searchForm = document.getElementById('searchForm');
const result = document.getElementById('result');
const deleteEntryDiv = document.getElementById('deleteEntryDiv')
const confirmDeleteBtn = document.getElementById('confirmDelete')
const denyDeleteBtn = document.getElementById('denyDelete')

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const searchWord = document.getElementById('searchWord').value;
  try {
    const res = await fetch(`${host}/api/v1/definition/${searchWord}`)
    if (res.status == 404) {
      const err = await res.json()
      throw new Error(`${err.error}<br>Message: ${err.message}<br>Entry: ${err.entry.word}<br>Total: ${err.total}`)
    }
    const data = await res.json()
    result.innerHTML = `Word: ${searchWord}<br>Definition: ${data.definition}<br> Entry: ${data.entry.word}<br>Total: ${data.total}`;
    const prompt = document.getElementById('deletePrompt')
    prompt.innerHTML = `Do you want to delete ${searchWord} from the dictionary?`
    deleteEntryDiv.style.display = "block"
    confirmDeleteBtn.onclick = deleteEntry
    denyDeleteBtn.onclick = denyDeleteEntry
    
  } catch (e) {
    result.innerHTML = `Error: ${e.message}`
  }
});

async function deleteEntry(){
  try{
    const word = document.getElementById('searchWord').value;
    const res = await fetch(`${host}/api/v1/definition/${word}`, {
      method: 'DELETE',
      })
    const resText = await res.json()
    result.innerHTML = `Message: ${resText.message}<br>Entry: ${JSON.stringify(resText.entry)}<br>Total: ${resText.total}`
    deleteEntryDiv.style.display = "none"
    document.getElementById("searchForm").reset();

  }catch(error){
    result.innerHTML = `Error: ${error}`
  } 
}

function denyDeleteEntry(){
  document.getElementById("searchForm").reset();
  deleteEntryDiv.style.display = "none"

}