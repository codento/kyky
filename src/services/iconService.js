import { Storage } from 'aws-amplify'

export const getIcon = (route) => {
  return Storage.get(route)
}

export const saveIcon = (file) => {
  return Storage.put('icon/' + file.name, file)
}
