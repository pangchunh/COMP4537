import { validate } from "../../../4/util/validation.js";

const host = 'http://localhost:3000'



const searchForm = document.getElementById('searchForm');
const result = document.getElementById('result');

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const searchWord = document.getElementById('searchWord').value;
  try {
    if (!validate(searchWord)) {
      throw new Error('Search word should not contain number or empty spaces')
    }
    const res = await fetch(`${host}/api/definitions/?word=${searchWord}`)
    if (res.status == 404) {
      const err = await res.text()
      throw new Error(err)
    }
    const data = await res.json()
    if (typeof (data) === 'string') {
      result.textContent = data
    } else {
      result.textContent = `Word: ${data.word}\nDefinition: ${data.definition}`;
    }
  } catch (e) {
    result.textContent = `Error: ${e.message}`
  }
});