export default function hasLetter(word) {
  const valid = /^([а-яё\s]+|[a-z\s]+)$/iu;
  if (valid.test(word)) {
    return true;
  }
  return false;
}
