<template>
  <div class="bg"  style="background-color: #0000BF" id="landing">
    <input class="helsinki" type="image" src="../../static/helsinki-logo.png">
    <input class="flag" type="image" v-for="(language, index) in languages" :key="index" @click="setLanguage(language)" :src="'../../static/'+ language +'-icon.png'"/>
    <div class="loydahelsinkibackground"></div>
    <input class="loydahelsinki" type="image" src="../../static/loydahelsinki-logo.png">
    <input class="kuva" type="image" src="../../static/landing.jpg">
    <input class="koro" type="image" src="../../static/koro.png">
    <input class="eu" type="image" src="../../static/eu-logo.png">
  </div>
</template>

<script>
import router from '../router/'
import {languages} from '../utils'
import EventBus from '../utils/eventBus'

export default {
  methods: {
    setLanguage (language) {
      EventBus.$emit('initAudio', {})
      router.push({name: 'info', params: { language: language }})
    }
  },
  data () {
    return {
      /* eslint-disable */
      selectedLanguage: null,
      languages: languages
    }
  }
}
</script>

<style>
#landing {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #0000BF;
  width: 100%;
}
.flag {
  object-fit: contain;
  outline: none;
  position:relative;
  float: right;
  margin: 4vw;
  height: 8vh;
}
.helsinki {
  object-fit: contain;
  position: absolute;
  top:0px;
  left:0px;
  outline: none;
  margin: 3vw;
  height: 10vh;
  padding: 3px;
}
.loydahelsinki {
  object-fit: contain;
  position: absolute;
  margin: 3vw;
  top:16vh;
  left:0px;
  outline: none;
  width: 94vw;
}
.loydahelsinkibackground {
  position: absolute;
  top: 16vh;
  height: 15vh;
  width: 100vw;
  background-color: #FFFFFF;
}
.kuva {
  object-fit: contain;
  width: 100vw;
  position: absolute;
  top: 30vh;
  left: 0vh;
}
.eu {
  object-fit: contain;
  width: 44vw;
  margin: 3vw;
  position: absolute;
  left:25vw;
  bottom: 0px;
}
.koro {
  position:absolute;
  object-fit: contain;
  width:100vw;
  left:0px;
  bottom: 0px;
}
.pic {
  outline: none;
  position: absolute;
  top:
}
</style>
