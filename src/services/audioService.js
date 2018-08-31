import { Storage } from 'aws-amplify'

export const saveAudio = (file) => {
  return Storage.put('audio/' + file.name, file)
}

export const saveInfoAudio = (file, lang) => {
  return Storage.put('audio/generalInformationClip-' + lang, file)
}