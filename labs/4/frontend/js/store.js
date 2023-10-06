const host = 'http://localhost:3000'
const storeForm = document.getElementById('storeForm');
const feedback = document.getElementById('feedback');


storeForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const word = document.getElementById('word').value;
    const definition = document.getElementById('definition').value;
    console.log(`word :${word}, definition: ${definition}`)
    try {
        const res = await fetch(`${host}/api/definitions/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ word, definition })
        })
        const resText = await res.text()
        feedback.textContent = resText
    } catch (e) {
        feedback.textContent = `Error ${e.message}`

    }
});