'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const secretEnv = require('./secret.env')

module.exports = merge(prodEnv, secretEnv, {
  NODE_ENV: '"development"'
})
