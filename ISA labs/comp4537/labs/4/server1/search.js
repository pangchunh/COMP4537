document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.getElementById('search-form');
  const result = document.getElementById('result');

  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchWord = document.getElementById('searchWord').value;

    fetch(`/api/definitions/?word=${encodeURIComponent(searchWord)}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          result.textContent = data.error;
        } else {
          result.textContent = `Word: ${data.word}, Definition: ${data.definition}`;
        }
      })
      .catch((error) => {
        console.error(error);
        result.textContent = 'An error occurred';
      });
  });
});
