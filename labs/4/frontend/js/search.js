const host = 'http://localhost:3000'

const searchForm = document.getElementById('searchForm');
const result = document.getElementById('result');

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchWord = document.getElementById('searchWord').value;

  fetch(`${host}/api/definitions/?word=${searchWord}`)
    .then((response) => {
      if (response.status === 404) {
        return response.text();
      }
      return response.json();
    })
    .then((data) => {
      if (typeof data === 'string') {
        result.textContent = data;
      } else {
        result.textContent = `Word: ${data.word}\nDefinition: ${data.definition}`;
      }
    })
    .catch((error) => {
      result.textContent = 'Error: ' + error.message;
    });
});