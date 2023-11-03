export const validate = function validateInput(s) {

  for (let i = 0; i < s.length; i++) {
    const ord = s.charCodeAt(i)
    if (!(65 <= ord && ord <= 90 || 97 <= ord && ord <= 122)) {
      return false
    }
  }
  return true
}