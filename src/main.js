// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Amplify from 'aws-amplify'
import './assets/common.css'
import './assets/animations.css'

require('dotenv').config()

Vue.config.productionTip = false

// Aws amplify
Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: process.env.REGION,
    userPoolId: process.env.USER_POOL_ID,
    identityPoolId: process.env.IDENTITY_POOL_ID,
    userPoolWebClientId: process.env.APP_CLIENT_ID
  },
  Storage: {
    region: process.env.REGION,
    bucket: process.env.RESOURCEBUCKET,
    identityPoolId: process.env.IDENTITY_POOL_ID
  }
})

// Touch event support
var VueTouch = require('vue-touch')

Vue.use(VueTouch, {name: 'v-touch'})

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  components: { App },
  template: '<App/>'
})
