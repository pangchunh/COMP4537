require('dotenv').config()
const express = require("express");
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 3000;
const db = require("../db/index");

app.use(express.json(), cors());

db.createTable(`CREATE TABLE IF NOT EXISTS dictionary (
  word varchar(255) NOT NULL,
  definition varchar(255) NOT NULL,
  word_language varchar(50) NOT NULL,
  definition_language varchar(50) NOT NULL,
  PRIMARY KEY (word))`);


db.createTable(`CREATE TABLE IF NOT EXISTS language (
  code varchar(50) NOT NULL,
  name varchar(50) NOT NULL,
  PRIMARY KEY (code)
)`)

app.get("/api/v1/definition/:word", async (req, res) => {
  const word = req.params.word;
  const entry = {word}
  const {rows} = await db.query('SELECT COUNT(*) FROM dictionary')
  const total = parseInt(rows[0].count)
  const sql = `SELECT definition
  FROM dictionary
  WHERE word = '${word}'`

  try {
    const { rows } = await db.query(sql)
    if (rows.length < 1) {
      res.status(404).json({"error": "Entry Not Found", "message": `The word ${word} does not exist in the dictionary.`, entry, total})
    } else {
      const definition = rows[0].definition
      res.status(200).json({
        "message": "Definition retrived",
        entry,
        definition,
        total
      })
    }
  } catch (error) {
    res.status(500).json({"message": "Error retrieving definition", error, entry, total})
  }
});

app.post("/api/v1/definition", async (req, res) => {
  const { word, definition, 'word-language': wordLanguage, 'definition-language': definitionLanguage } = req.body;
  const entry = {'word': word || '', 'definition': definition || '', 'word-language': wordLanguage || '', 'definition-language': definitionLanguage || ''}

  const {rows} = await db.query(`SELECT COUNT(*) FROM dictionary`)
  const total = parseInt(rows[0].count)

  try {
    //chatgpt generated
    if (!word || !definition || !wordLanguage || !definitionLanguage) {
      const missingFields = [];
      if (!word) missingFields.push('word');
      if (!definition) missingFields.push('definition');
      if (!wordLanguage) missingFields.push('word-language');
      if (!definitionLanguage) missingFields.push('definition-language');

      return res.status(400).json({
        "message": `Entry missing {${missingFields.join(', ')}}`,
        entry})
    }
    //end of chatgpt

    const sql = `SELECT * FROM dictionary WHERE word = '${word}'`;
    const existingWord = await db.query(sql)
    
    if (existingWord.rowCount > 0) {  
      res.status(409).json({"error": "Word Conflict", "message": `The word ${word} already exist`, entry, total})
    } else {
      const insert_query = `INSERT INTO dictionary(word, definition, word_language, definition_language)
      VALUES('${word}', '${definition}', '${wordLanguage}', '${definitionLanguage}')`
      const result = await db.query(insert_query)
      console.log(result.rows[0])
      const {rows} = await db.query(`SELECT COUNT(*) FROM dictionary`)
      const total = parseInt(rows[0].count)
      
      res.status(201).json({
        message: "Entry created successfully", 
        entry,
        total
      })
    }
  } catch (error) {
    const {rows} = await db.query('SELECT COUNT(*) FROM dictionary')
    const total = parseInt(rows[0].count)
    res.status(500).json({"message": "Error inserting into db", error, entry, total})
  }
});

app.patch("/api/v1/definition/:word", async(req, res) => {
  //update the definition of an existing word in the database
  const word = req.params.word;
  const definition = req.body.definition;
  const entry = {word, definition}
  try{
    const sql = `UPDATE dictionary SET definition = '${definition}'
    where word = '${word}'`
    const {rows} = await db.query(`SELECT COUNT(*) FROM dictionary`)
    const total = rows[0].count
    const {rowCount} = await db.query(sql)
    if(rowCount === 1){
      res.status(201).json({"message": "Update successful", entry, total})
    } else{
      res.status(404).json({"message": "Entry Not Found", "error": `The word ${word} does not exist in the dictionary.`, entry, total})
    }
  }catch(error){
    const {rows} = await db.query('SELECT COUNT(*) FROM dictionary')
    const total = parseInt(rows[0].count)
    res.status(500).json({"message": "Error updating entries", error, entry, total})
  }
});

app.delete("/api/v1/definition/:word", async(req, res) => {
  const word = req.params.word;
  const entry = {word}
  const sql = `DELETE FROM dictionary 
  WHERE word = '${word}'`

  try {
    const result = await db.query(sql)
    const {rows} = await db.query('SELECT COUNT(*) FROM dictionary')
    const total = parseInt(rows[0].count)
    if (result.rowCount === 1){
      res.status(201).json({"message": "Delete successful", entry, total})
    } else{
      res.status(404).json({"message": "Entry Not Found", "error": `The word ${word} does not exist in the dictionary.`, entry, total})
    }

  }catch(error){
    const {rows} = await db.query('SELECT COUNT(*) FROM dictionary')
    const total = parseInt(rows[0].count)
    res.status(500).json({"message": "Error deleting entries", error, entry, total})

  }
});

app.get("/api/v1/languages", async(req, res) => {
  try{
    const {rowCount, rows} = await db.query('SELECT * FROM language')
    const total = rowCount
    res.status(200).json({
      "message": "Languages retrived",
      rows,
      total,
    })
  } catch(error){
    const {rowCount} = await db.query('SELECT * FROM language')
    const total = rowCount
    res.status(500).json({
      "message": "Error retrieving languages",
      error,
      total
    })


  }
  
});

app.listen(PORT, () => {
  console.log(`App listening at ${PORT}`);
});
