<template>
  <div
    class="bg container.fluid"
    :style="bgStyle(true)"
    id="info">
    <div class="row" style="max-height: 100vh">
      <div class="col-xl-2 col-md-3 col-sm-4 col-5 zeropadding adminsidebar">
        <admin-controls
          v-if="user.authenticated"
          :node="node"
          @addChild="addChild"
          @getJSON="getJSON"
          @addContent="addContent"
          :selectedLanguage="languageIndex"
          :deleteMode="deleteMode"
          @toggleDeleteMode="toggleDeleteMode"
          :unloadListener="unloadListener"
          @addLocation="addLocation"/>
      </div>
      <div class="col-xl-10 col-md-9 col-sm-8 col-7">
        <!-- These taken from below:  v-on:swipeleft="moveToSibling(true)" v-on:swiperight="moveToSibling(false)" -->
        <v-touch v-on:swiperight="moveToParent">
          <transition :name="transitionOrientation" mode="out-in">
            <Node
              :node="node"
              :adminview="true"
              :key="node.id"
              @moveToChild="moveToChild"
              :selectedLanguage="languageIndex"
              :deleteMode="deleteMode"
              @deleteChild="deleteChild"
              @audioPreviewUpload="audioPreviewUpload"
              @iconUpdate="updateIcon"
              view="admin"
              :style="bgStyle(false)"
              />
            </transition>
            <div class="row">
          </div>
          <div id="leftarrow" v-if="parent" @click="moveToParent">
            <i style="font-size: 3.2em; color: black; text-align: center;" class="fas fa-angle-left" />
          </div>
          <!--div id="leftarrow" v-if="parent && parent.children.length > 1" @click="moveToSibling(false)">
            <i style="font-size: 3.2em; color: black; text-align: center;" class="fas fa-angle-left" />
          </div-->
          <!--div id="rightarrow" v-if="parent && parent.children.length > 1" @click="moveToSibling(true)">
            <i style="font-size: 3.2em; color: black; text-align: center;" class="fas fa-angle-right" />
          </div-->
          <div class="navigationarea">
            <div id="soundarea" style="min-height: 50px;">
              <!-- Made always visible by removing: v-if="node.audio[languageIndex]" -->
              <sound
                :adminview="true"
                :sound="node.audio[languageIndex]"
                :deleteMode="deleteMode"
                @deleteSound="deleteSound"
                :flipMuted="flipMuted"
                :muted="muted"/>
            </div>
            <div class="mapIcon" style="cursor: pointer;" v-if="node.location">
              <i :style="'font-size: ' + getMapIconSize() + 'em'" class="fas fa-compass" data-toggle="modal" data-target="#exampleModal"></i>
            </div>
            <div>
              <input
                class="headericon"
                style="background-color: rgba(0,0,0,0.3); max-height: 150px; position: absolute; bottom: 20px; left: 40%; transform: translate(-50%)"
                type="image"
                @click="handleInfoButtonClick"
                src="../../static/info.png">
            </div>
            <img
              class="language-btn"
              type="image"
              @click="changeLanguage()"
              :src="'../../static/'+ selectedLanguage +'-icon.png'"/>
          </div>
        </v-touch>
      </div>
      <div class="col-xl-1 col-md-1 col-sm-1 col-1" />
    </div>
  </div>
</template>

<script>
import { Node, AdminControls, Sound } from '../components/'
import { saveJSONTree, saveAdminJSON, getAdminJSON } from '../services/jsonService'
import { isRootNode, verifyProtocol, getPrefix } from '../utils'
import Auth from '../auth'
import { nodemixin, languagemixin } from '../mixins/'
import { saveAudio } from '../services/audioService'
import { saveIcon } from '../services/iconService'
import EventBus from '../utils/eventBus'

export default {
  name: 'Admin',
  components: {
    Node,
    AdminControls,
    Sound
  },
  mixins: [nodemixin, languagemixin],
  methods: {
    getMapIconSize: function () {
      const windowHeight = document.documentElement.clientHeight
      return windowHeight / 140
    },
    getJSON: function (target) {
      let tempNode = this.node
      while (isRootNode(tempNode.id)) {
        tempNode = this.parent
        this.parent = this.parent.parent
      }
      this.deleteParents(tempNode)
      this.parent = null
      if (target === 'publish') {
        const targetJSON = JSON.stringify(tempNode)
        saveAdminJSON(targetJSON)
        saveJSONTree(targetJSON)
      } else {
        saveAdminJSON(JSON.stringify(tempNode))
      }
      this.node = tempNode
      this.path = []
    },
    deleteParents (node) {
      // eslint-disable-next-line
      node.parent ? delete node.parent : {}
      if (!node.children) {
        return node
      }
      node.children.forEach(child => {
        this.deleteParents(child)
      })
    },
    addChild: function (child) {
      this.node.children.push(child)
    },
    addContent: function (content) {
      this.node = Object.assign({}, this.node, content)
    },
    toggleDeleteMode: function () {
      this.deleteMode = !this.deleteMode
    },
    deleteChild: function (index) {
      if (!window.confirm("Haluatko varmasti poistaa aiheen?")) {
        return
      }
      if (!!this.node.children.length || !!this.node.children[index].children.length) {
        this.node.children.splice(index, 1, {
          'id': Math.ceil(Math.random() * 1000000),
          'parent': this.node,
          'audio': ['', '', ''],
          'icon': '',
          'links': [],
          'children': [],
          'previewAudio': ['', '', '']
        })
      }
    },
    deleteSound: function () {
      this.node.audio.splice(this.languageIndex, 1, '')
    },
    audioPreviewUpload: function (file, index) {
      if (file && file.size > 400000) {
        alert('Suurin sallittu tiedosto koko on 400kb')
        return
      }
      saveAudio(file).then((res) => {
        this.node.children[index].previewAudio[this.languageIndex] = res.key
      })
    },
    addLocation (location) {
      this.node.location = location
    },
    updateIcon (file, index) {
      if (file && file.size > 50000) {
        alert('Suurin sallittu tiedosto koko on 50kb')
        return
      }
      saveIcon(file).then((res) => {
        let link = this.$children[0].newUrl
        if (link) {
          // NOT CHANGING ICON, FIX
          if (link && !verifyProtocol(link)) {
            link = getPrefix(link) + link
          }
          this.$set(this.node.children[index], 'url', link)
          this.$children[0].newUrl = ''
          this.$set(this.node.children[index], 'icon', res.key)
          return
        }
        this.$set(this.node.children[index], 'icon', res.key)
        this.$delete(this.node.children[index], 'url')
        if (this.node.children[index].children.length === 12) {
          return
        }
        let array = Array(12).fill({})
        let leafs = array
          .map(i => {
            return {
              'id': Math.ceil(Math.random() * 1000000),
              'parent': this.node,
              'audio': ['', '', ''],
              'icon': '',
              'links': [],
              'children': [],
              'previewAudio': ['', '', '']
            }
          }
          )
        this.node.children[index].children = leafs
      })
    }
  },
  data () {
    return {
      /* eslint-disable */
       transitionOrientation: 'slidedown',
       deleteMode: false,
       user: Auth.user,
       path: [],
       unloadListener: null
    }
    /* eslint-enable */
  },
  created () {
    EventBus.$emit('initAudio', {})
    this.unloadListener = function (e) {
      const confirmationMessage = 'Olethan tallentanut muutoksesi';
      (e || window.event).returnValue = confirmationMessage // Gecko + IE
      return confirmationMessage // Gecko + Webkit, Safari, Chrome etc.
    }
    window.addEventListener('beforeunload', this.unloadListener)
    getAdminJSON()
      .then(res => {
        this.node = res
        const target = this.node.audio[this.languageIndex]
        target ? EventBus.$emit('playAudio', target) : {}
      })
  }
}
</script>
<style>
#info {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  position: relative;
}

#uparrow {
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 2;
}
#leftarrow {
  position: absolute;
  left: 0;
  top: 30%;
  padding-left: 25px;
  z-index: 2;
}
#rightarrow {
  position: absolute;
  right: 0;
  top: 30%;
  padding-right: 25px;
  z-index: 2;
}
.col-md-9, .col-sm-8, .col-xl-10 {
  padding-right: 0px;
  padding-left: 0px;
}
.mapIcon {
  width: 80%;
  outline: none;
  position: absolute;
  bottom: 20px;
}
.navigationarea {
  position: fixed;
  bottom: 0px;
  width: 100%;
}
.adminsidebar {
  padding-left: 0px;
  padding-right: 0px;
  height: 100vh;
  background-color: #C0C0C0;
  min-width: 180px;
  z-index: 3;
}
</style>
