<template>
  <div class="bg" style="background-color: #9fc9eb" id="landing">
    <input class="flag" type="image" v-for="(language, index) in languages" :key="index" @click="setLanguage(language)" :src="'../../static/'+ language +'-icon.svg'"/>
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
  color: #2c3e50;
  width: 100%;
}
.flag {
  outline: none;
  height: 10vh;
  padding: 3px;
}
</style>
