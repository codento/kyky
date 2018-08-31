'use strict'
const merge = require('webpack-merge')
const secretEnv = require('./secret.env')

module.exports = merge(secretEnv, {
  NODE_ENV: '"production"'
})
