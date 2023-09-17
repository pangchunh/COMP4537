export default function getLocalSotrageItemAsString(key){
  const savedItem = localStorage.getItem(key)
  if (savedItem){
    return JSON.parse(savedItem)
  } else return null
}