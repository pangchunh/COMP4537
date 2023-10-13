const host = 'http://localhost:3000'


document.getElementById('insertButton').addEventListener('click', async () => {
  console.log('inserted button clicked')
  const query = document.getElementById('queryTextarea').value;
  const response = await fetch(`${host}/insert`, { method: 'POST', body: JSON.stringify(query)});
  const data = await response.json();

  document.getElementById('response').innerText = `Result: ${JSON.stringify(data)}`;
});

document.getElementById('submitButton').addEventListener('click', async () => {
  const query = document.getElementById('queryTextarea').value;
  const method = query.toLowerCase().startsWith('select') ? 'GET' : 'POST';
  const response = await fetch(`${host}/query`, {
      method: method,
      body: JSON.stringify({ query }),
      headers: {
          'Content-Type': 'application/json'
      }
  });
  const data = await response.text();
  document.getElementById('response').innerText = data;
});