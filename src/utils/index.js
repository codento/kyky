export function isRootNode (id) {
  return id !== 'root'
}

export function mod (number, moduloValue) {
  return ((number % moduloValue) + moduloValue) % moduloValue
}

export let languages = ['fi', 'so', 'ar']

export function verifyProtocol (input) {
  return /^(f|ht)tps?:\/\//.test(input)
}

export function getPrefix (input) {
  return (/www./.test(input) || input.endsWith('.com')) ? 'http://' : 'tel:'
}

// This exists because old links were stored only as strings, now -> array by language
export const makeStringIntoArray = target => typeof target === 'string' ? [target, '', ''] : target