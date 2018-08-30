<template>
  <div class="bg" :style="bgStyle(true)" id="info">
    <div class="header">
        <input class="helsinki" type="image" src="../../static/helsinki-logo.png">
        <!-- tämä tuohon alas jos audionappi vain silloin kuin audiota; v-if="node.audio[languageIndex]" -->
        <sound :sound="node.audio[languageIndex]" :muted="muted" :flipMuted="flipMuted"/>
        <input class="headericon" type="image" src="../../static/info.png" @click="handleInfoButtonClick">
        <img
          class="headericon"
          type="image"
          @click="changeLanguage()"
          :src="'../../static/' + selectedLanguage + '-icon.png'"/>
      <PathStack
        :path="path"
        :colors="colors"
        :moveToParent="moveToParent"/>
    </div>
    <div class="arrow">
      <img class="arrow" type="image" src="../../static/uparrow.png" v-if="parent" @click="moveToParent">
    </div>

    <v-touch
      @swiperight="moveToParent">
      <transition :name="transitionOrientation" mode="out-in">
        <Node
          :node="node"
          :key="node.id"
          @moveToChild="moveToChild"
          :selectedLanguage="languageIndex"
          view="info"
          :style="bgStyle(false)"
          />
      </transition>
    </v-touch>
    <modal v-show="showModal"/>

  </div>
</template>

<script>
import { Node, Sound, Modal, Header, PathStack } from '../components/'
import Auth from '../auth'
import { nodemixin, languagemixin } from '../mixins/'
import { getJSONfromS3 } from '../services/jsonService'
import EventBus from '../utils/eventBus'

export default {
  name: 'info',
  components: {
    Node,
    Sound,
    Modal,
    Header,
    PathStack
  },
  mixins: [nodemixin, languagemixin],
  data () {
    return {
      /* eslint-disable */
       loggedIn: false,
       transitionOrientation: 'slideleft',
       animations: ['slideleft', 'slideright'],
       deleteMode: false,
       user: Auth.user,
       path: [],
       pushed: false,
       portrait: '',
       showModal: false,
       muted: false
    }
    /* eslint-enable */
  },
  watch: {
    languageIndex () {
      this.$router.push({
        name: 'info',
        params: {
          language: this.languages[this.languageIndex]
        }
      })
    }
  },
  methods: {
    getMapIconSize: function () {
      const windowHeight = document.documentElement.clientHeight
      return windowHeight / 140
    },
    showModalIfNotPortrait (angle) {
      if (angle === 0) {
        this.showModal = false
      } else {
        this.showModal = true
      }
    },
    flipMuted () {
      this.muted = !this.muted
    }
  },
  created: function () {
    getJSONfromS3()
      .then(res => {
        this.node = res
        const target = this.node.audio[this.languageIndex]
        target ? EventBus.$emit('playAudio', target) : {}
      })

    /* Disable backbutton */
    history.pushState(null, document.title, location.href)
    window.addEventListener('popstate', function (event) {
      history.pushState(null, document.title, location.href)
    })

    this.showModalIfNotPortrait(window.screen.orientation.angle)
    window.addEventListener('orientationchange', () => {
      this.showModalIfNotPortrait(window.screen.orientation.angle)
    })
  }
}
</script>

<style>
.arrow {
  position: absolute;
  display: block;
  margin-left: 45%;
  margin-right: 50%;
  bottom: 5vh;
  height: 10vw;
  max-height: 110px;
  z-index: 6;
}
.mapIcon {
  width: 100vw;
  outline: none;
  position: absolute;
  bottom: 20px;
}
.navigationarea {
  position: relative;
  top: 0px;
  width: 100%;
}
.header {
  background-color: #0000BF;
  height: 22vh;
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
.headericon {
  object-fit: contain;
  position:relative;
  float:right;
  margin-top: 15px;
  margin-right: 4vw;
  height: 7vh;
  max-height: 13vw;
}
</style>
