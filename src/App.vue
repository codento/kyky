<template>
  <div class="app">
    <audio id="player"/>
    <main class="main">
        <router-view></router-view>
    </main>
  </div>
</template>

<script>
import nodemixin from './mixins/nodemixins'
import EventBus from './utils/eventBus'
import { getJSONfromS3 } from './services/jsonService'

let player

export default {
  name: 'App',
  mixins: [nodemixin],
  mounted () {
    EventBus.$on('initAudio', function (payLoad) {
      player = document.getElementById('player')
      player.load()
      player.play()
    })
    EventBus.$on('playAudio', function (input) {
      if (input) {
        player.src = 'https://s3-eu-west-1.amazonaws.com/' + process.env.RESOURCEBUCKET + '/public/' + input
        player.load()
        player.play()
      }
    })
    EventBus.$on('stopAudio', function () {
      player.load()
    })
  },
  created: function () {
    getJSONfromS3()
      .then(res => {
        this.node = res
        const target = this.node.audio[this.languageIndex]
        target ? EventBus.$emit('playAudio', target) : {}
      })
  }
}
</script>

<style>
.nopadding {
  padding-left: 0px;
  padding: 0px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 98vw;
  height: 100vh;
}
body {
  background-size: cover;
  line-height: 0.7;
}
.bg {
  height: 100vh;
  background-repeat: no-repeat;
  background-position: bottom right;
  background-size: 75% 50%;
  z-index: -1;
}
#controls {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
#control-row {
  height: 55px;
}
#direction {
  width: 55px;
  float: left;
}
#soundarea {
  position: fixed;
  bottom: 20px;
  right: 5vw;
}
#info {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
}
.language-btn {
  left: 20px;
  outline: none;
  position: absolute;
  bottom: 20px;
  height: 17vw;
  max-height: 110px;
  z-index: 50;
}
.btn {
  padding: 0.375rem
}
</style>
