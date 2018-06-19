# k2

> KYKY 2
## Installation

### Prerequisites
- AWS account
  - AWS s3 bucket with web hosting enabled
  - IAM role for accessing S3 items
  - Cognito user pool and identity pool for managing admin users 
- Updated .env to match AWS settings
### Build Setup

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
