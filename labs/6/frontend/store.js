import { validate } from "../../util/validation.js";

const host = 'https://chun-cody-lab4.onrender.com'

const storeForm = document.getElementById('storeForm');
const feedback = document.getElementById('feedback');
storeForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const word = document.getElementById('word').value;
    const definition = document.getElementById('definition').value;

    try{
      if (!validate(word)){
        throw new Error('Input word should not contain numbers or empty spaces')
      }
      const res = await fetch(`${host}/api/definitions/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ word, definition })
    })
    const resText = await res.text()
    feedback.textContent = resText
    
    }catch(e){
      feedback.textContent = `Error: ${e.message}`
    }
});