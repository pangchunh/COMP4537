export function getLocalSotrageItemAsObject(key) {
  const savedItem = localStorage.getItem(key)
  if (savedItem) {
    return JSON.parse(savedItem)
  } else return null
}

export function notesValueEqual(a, b) {
  if (!a || !b) {
    return false
  }

  const firstContent = a.map(note => note.value)
  const secondContent = b.map(note => note.value)

  firstContent.sort()
  secondContent.sort()

  return firstContent.every((value, index) => value === secondContent[index])
}
