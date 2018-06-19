import { Storage } from 'aws-amplify'

const bucketUrl = 'https://' + process.env.RESOURCEBUCKET + '.s3.eu-west-1.amazonaws.com/public/json'

export const getJSONfromS3 = () => {
  return fetch(bucketUrl)
    .then(jsonFile => jsonFile.json())
    .then(json => json)
}

export const getAdminJSON = () => {
  return fetch(bucketUrl + 'admin')
    .then(jsonFile => jsonFile.json())
    .then(json => json)
}

export const saveJSONTree = (json) => {
  return Storage.put('json', json)
}

export const saveAdminJSON = (json) => {
  return Storage.put('jsonadmin', json)
}
