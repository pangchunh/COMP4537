const fs = require('fs')

exports.date = function getDate(){
  return new Date().toLocaleString()
}

exports.appendFile = function writeFile(content){
  try{
    fs.appendFileSync('./file.txt', content)

  }catch(err){
    return {error: err}
  }
}

exports.readFile = (fileName) =>{
  try{
    return fs.readFileSync(`./${fileName}`)
  }catch(err){
    return err
  }
}