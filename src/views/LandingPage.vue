<template>
  <div class="bg"  style="background-color: #0000BF" id="landing">
    <input class="helsinki" type="image" src="../../static/helsinki-logo.png">
    <!-- v-if="language !== 'ar'" Disables Arabia -->
    <input class="flag" type="image" v-for="(language, index) in languages" v-if="language !== 'ar'" :key="index" @click="setLanguage(language)" :src="'../../static/'+ language +'-icon.png'"/>
    <input class="loydahelsinki" style="max-height: 90px;" type="image" src="../../static/loydahelsinki-logo.png">
    <div class="loydahelsinkibackground"></div>
    <div v-if="!showInfo">
      <img class="kuva noselect" style="max-height: 600px; background-color: rgba(255,255,255,1)" type="image" src="../../static/landing.jpg">
      <img class="koro" type="image" src="../../static/koro.png">
      <img class="eu" type="image" src="../../static/eu-logo.png">
    </div>
    <ProjectInfo v-if="showInfo"/>
    <button class="info-btn" @click="goToProjectInfo">
      Tietoa sovelluksesta
    </button>
  </div>
</template>

<script>
import router from '../router/'
import {languages} from '../utils'
import EventBus from '../utils/eventBus'
import ProjectInfo from '../components/ProjectInfo'

export default {
  props: [
    'showInfo'
  ],
  components: {
    ProjectInfo
  },
  methods: {
    setLanguage (language) {
      EventBus.$emit('initAudio', {})
      router.push({ name: 'info', params: { language: language } })
    },
    goToProjectInfo () {
      router.push({ name: 'tekijatiedot', params: { showInfo: true } })
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
  margin-top: 15px;
  margin-right: 4vw;
  height: 7vh;
  max-height: 13vw;
}
.helsinki {
  object-fit: contain;
  position: absolute;
  top:0px;
  left:0px;
  outline: none;
  margin-top: 10px;
  margin-left: 3vw;
  margin-right: 3vw;
  margin-bottom: 3vw;
  height: 10vh;
  padding: 3px;
}
.loydahelsinki {
  object-fit: contain;
  position: absolute;
  margin: 10px;
  margin-left: 2vh;
  margin-right: 2vh;
  padding-left: 10px;
  padding-right: 10px;
  top:16vh;
  left:0px;
  outline: none;
  width: 94vw;
  height: 10vh;
  max-height: 15vh;
  z-index: 100;
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
  top: 31vh;
  left: 0vh;
}
.eu {
  object-fit: contain;
  width: 44vw;
  margin: 15px;
  position: fixed;
  left:25vw;
  bottom: 0px;
  max-height: 15vh;
}
.koro {
  position: fixed;
  object-fit: fill;
  max-height: 20vh;
  width:100vw;
  left:0px;
  bottom: 0px;
  margin-bottom: 0px;
}
.pic {
  outline: none;
  position: absolute;
}
.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
}
.info-btn {
  position: absolute;
  bottom: 5px;
  left: 5px;
  padding: 0.2rem;
  padding-left: 0rem;
  padding-right: 0rem;
  max-width: 25vw;
  font-size: 0.8rem;
  background: none;
  border: 0px;
  line-height: 0.8rem;
}
</style>
