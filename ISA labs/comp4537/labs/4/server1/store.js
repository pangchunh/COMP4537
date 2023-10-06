document.addEventListener('DOMContentLoaded', () => {
  const storeForm = document.getElementById('store-form');
  const feedback = document.getElementById('feedback');

  storeForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const word = document.getElementById('word').value;
    const definition = document.getElementById('definition').value;
    console.log(word, definition)
    fetch('/api/definitions', {
        method: 'POST',
        body: JSON.stringify({
          word,
          definition
        }), // Include word and definition in the request body
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          feedback.textContent = data.error;
        } else {
          feedback.textContent = data.message;
        }
      })
      .catch((error) => {
        console.error(error);
        feedback.textContent = 'An error occurred';
      });
  });
});