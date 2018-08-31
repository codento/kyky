# k2

> KYKY 2
## Installation

### Prerequisites
- AWS account
  - AWS s3 bucket with web hosting enabled
  - IAM role for accessing S3 items
  - Cognito user pool and identity pool for managing admin users 
- Updated .env to match AWS settings

### Setup

- Setup AWS
- Create a file: /config/secret.env.js
- Content should be like (with variables set according to AWS setup):

``` bash
module.exports = {
  USER_POOL_ID: '"eu-central-1_nMasj3naf"',
  REGION: '"eu-central-1"',
  IDENTITY_POOL_ID: '"eu-central-1:sfj2akj-j32b-ll2f-nsfj-8x8e8wjern"',
  APP_CLIENT_ID: '"987vsjhkesjkehv98h3"',
  RESOURCEBUCKET: '"bucketname"',
  MAPS_KEY: '"ADM3mwkfnk3wFKSNFwfeKNFwkkwef"'
}
```

### AWS Setup

In addition to .env file add its contents to secret.env.js like shown above.

[Tutorial](https://docs.google.com/document/d/e/2PACX-1vTgZOdXz2sqJ4MH8ISCl3Eb7Ci5XFjw-wULsXHNcgo6dWrFo7axGaOOS6f5yJY4fSyM6QtpaFQUVbAJ/pub)

### Running

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test

#Deploy to S3
npm run deploy
```
