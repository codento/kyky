<template>
  <div class="bg" :style="bgStyle(true)" id="info">
    <v-touch
      @swipedown="moveToParent"
      @swipeleft="moveToSibling(true)"
      @swiperight="moveToSibling(false)">
      <div id="uparrow" v-if="parent" @click="moveToParent">
        <i style="font-size: 3.2em; color: black; text-align: center;" class="fas fa-angle-up" />
      </div>
      <div id="leftarrow" v-if="parent && parent.children.length > 1" @click="moveToSibling(false)">
        <i style="font-size: 3.2em; color: black; text-align: center;" class="fas fa-angle-left" />
      </div>
      <div id="rightarrow" v-if="parent && parent.children.length > 1" @click="moveToSibling(true)">
        <i style="font-size: 3.2em; color: black; text-align: center;" class="fas fa-angle-right" />
      </div>
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
      <div class="navigationarea" v-if="!showModal">
        <img
          class="language-btn"
          type="image"
          @click="changeLanguage()"
          :src="'../../static/' + selectedLanguage + '-icon.svg'"/>
        <div>
          <div class="mapIcon" style="cursor: pointer;" v-if="node.location">
            <i :style="'font-size: ' + getMapIconSize() + 'em'" class="fas fa-compass" data-toggle="modal" data-target="#exampleModal"></i>
          </div>
        </div>
        <div>
          <div id="soundarea" style="min-height: 50px;">
            <sound
              v-if="node.audio[languageIndex]"
              :sound="node.audio[languageIndex]"/>
          </div>
        </div>
      </div>
    </v-touch>
    <modal v-show="showModal"/>
  </div>
</template>

<script>
import {Node, Sound, Modal} from '../components/'
import Auth from '../auth'
import {nodemixin, languagemixin} from '../mixins/'
import { getJSONfromS3 } from '../services/jsonService'
import EventBus from '../utils/eventBus'

export default {
  name: 'info',
  components: {
    Node,
    Sound,
    Modal
  },
  mixins: [nodemixin, languagemixin],
  data () {
    return {
      /* eslint-disable */
       loggedIn: false,
       transitionOrientation: 'slidedown',
       animations: ['slideleft', 'slideright', 'slideup', 'slidedown'],
       deleteMode: false,
       user: Auth.user,
       path: [],
       pushed: false,
       portrait: '',
       showModal: false
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
#uparrow {
  position: absolute;
  top: 0;
  width: 100vw;
  z-index: 2;
}
#leftarrow {
  position: absolute;
  left: 0;
  top: 30vh;
  padding-left: 5px;
  z-index: 2;
}
#rightarrow {
  position: absolute;
  right: 0;
  top: 30vh;
  padding-right: 5px;
  z-index: 2;
}
.mapIcon {
  width: 100vw;
  outline: none;
  position: absolute;
  bottom: 20px;
}
.navigationarea {
  position: fixed;
  bottom: 0px;
  width: 100%;
}
</style>
