const host = 'https://chuncodylab5.onrender.com'


document.getElementById('insertButton').addEventListener('click', async () => {
  const response = await fetch(`${host}/insert`, { method: 'POST'});
  const data = await response.json();

  document.getElementById('response').innerText = `Result: ${JSON.stringify(data.result)}`;
});

document.getElementById('submitButton').addEventListener('click', async () => {
  const query = document.getElementById('queryTextarea').value;
  if (query.toLowerCase().startsWith('select')){
    const response = await fetch(`${host}/query/?dbquery=${query}`, {
      method: 'GET',
    })
    const data = await response.json()
    document.getElementById('response').innerText = JSON.stringify(data.result);
  } else{
    const response = await fetch(`${host}/query`, {
      method: 'POST',
      body: query,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    document.getElementById('response').innerText = JSON.stringify(data.result);
  }
});