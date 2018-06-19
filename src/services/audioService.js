import { Storage } from 'aws-amplify'

export const saveAudio = (file) => {
  return Storage.put('audio/' + file.name, file)
}
