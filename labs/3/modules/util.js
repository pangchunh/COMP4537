const fs = require('fs')

exports.date = function getDate(){
  return new Date().toLocaleString()
}

exports.appendFile = async function writeFile(content){
  try{
    fs.appendFileSync('./file.txt', content)

  }catch(err){
    console.log(err)
  }
}