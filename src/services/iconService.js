import { Storage } from 'aws-amplify'

export const getIcon = (route) => {
  return Storage.get(route)
}

export const saveIcon = (file) => {
  if (file && file.size > 50000) {
    alert('Suurin sallittu tiedosto koko on 50kb')
    return
  }
  return Storage.put('icon/' + file.name, file)
}
