document.getElementById('insertButton').addEventListener('click', async () => {
  const response = await fetch('/insert', { method: 'POST' });
  const data = await response.text();
  document.getElementById('response').innerText = data;
});

document.getElementById('submitButton').addEventListener('click', async () => {
  const query = document.getElementById('queryTextarea').value;
  const method = query.toLowerCase().startsWith('select') ? 'GET' : 'POST';
  const response = await fetch('/query', {
      method: method,
      body: JSON.stringify({ query }),
      headers: {
          'Content-Type': 'application/json'
      }
  });
  const data = await response.text();
  document.getElementById('response').innerText = data;
});