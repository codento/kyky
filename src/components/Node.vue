<template>
<div :style="adminview ? 'height: 100vh;' : 'height: 78vh'">
  <div :key="node.id" style="padding-left: 31px; padding-right: 31px;" class="container iconarea" v-if="hasChildren">
    <div
      v-for="(n, index) in node.children"
      :key="n.id"
      class="btn">
        <div v-if="adminview" style="height: 70px; max-width: 130px; word-wrap: break-word;">
          <p style="white-space: pre-line; font-size: 11.5px;">
            {{ n.previewAudio[selectedLanguage] }}
          </p>
        </div>
       <v-touch
        ref="tapper"
        @tap="(e) => handleTap(e, index, n.id)"
        @press="onPress(index)"
        :press-options="{ time: 200 }"
        :tap-options="{ time: 250 }"
        style="width: 100%; height: 100%;">
        <div
          :id="n.id"
          :style="getColor(n)"
          class="btn box">
          <!--i v-if="n.url" class="icontext fas fa-external-link-alt"></i-->
          <img
            class="icon"
            draggable="false"
            :src="iconUrl(n.icon)"
            @contextmenu.prevent="{}"
            @dragenter.prevent="(e) => handleDragEnter(e, n.id)"
            @dragleave.prevent="(e) => handleDragLeave(e, n.id, n.url)"
            @drop.prevent="(e) => handleDrop(e, index, n.id)"
            @dragover.prevent="{}">
        </div>
      </v-touch>
    </div>
  </div>
  <div v-if="emptyNode" style="padding-top: 15vh; font-size: 20px">Ei mitään näytettävää.</div>
  <div class="modal fade" style="z-index: 100" id="exampleModal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body">
            <iframe
              class="maps"
              frameborder="0" style="border: 0;"
              :src="mapsUrl" allowfullscreen>
            </iframe>
          </div>
        </div>
        <button class="btn btn-danger" style="position: fixed; top: 15vh; width: 100%;">
            Close
          </button>
      </div>
    </div>
  <!--div class="mapIcon" style="cursor: pointer;" v-if="node.location">
    <i :style="'font-size: ' + getMapIconSize() + 'em'" class="fas fa-compass" data-toggle="modal" data-target="#exampleModal"></i>
  </div-->
</div>
</template>

<script>
import EventBus from '../utils/eventBus'
import { makeStringIntoArray } from '../utils'

export default {
  name: 'Node',
  props: [
    'transitionOrientation',
    'node',
    'selectedLanguage',
    'deleteMode',
    'view',
    'adminview'
  ],
  computed: {
    mapsUrl () {
      return 'https://www.google.com/maps/embed/v1/place?key=' + process.env.MAPS_KEY + '&q=' + this.node.location
    },
    hasChildren () {
      return (this.node.children && this.node.children.length > 0)
    },
    emptyNode () {
      return this.node.children.length < 1 && this.node.links.length < 1
    }
  },
  methods: {
    getColor: function (n) {
      let color = 'background: '
      if (n.url) {
        color += 'rgba(255,255,255,1); border-radius: 60px;'
      }
      if (n.icon === '') {
        color += this.view === 'admin' ? 'rgba(4,4,0,0.1);' : 'rgba(4,4,0,0);'
      }
      return color
    },
    iconUrl: function (route) {
      return route
        ? 'https://' + process.env.RESOURCEBUCKET + '.s3.eu-west-1.amazonaws.com/public/' + route
        : 'https://www.transparenttextures.com/patterns/asfalt-light.png'
    },
    handleTap: function (e, index) {
      if (!this.node.children[index].icon) {
        return
      }
      if (this.deleteMode) {
        this.$emit('deleteChild', index)
      } else {
        this.$emit('moveToChild', index)
      }
    },
    handleDragEnter (e, id) {
      this.view === 'admin' ? document.getElementById(id).style.background = 'orange' : {}
    },
    handleDragLeave (e, id, url) {
      if (e.target.src === 'https://www.transparenttextures.com/patterns/asfalt-light.png') {
        document.getElementById(id).style.background = this.view === 'admin' ? 'rgba(4, 4, 0, 0.1)' : 'rgba(4, 4, 0, 0)'
        return
      }
      if (url) {
        document.getElementById(id).style.background = 'rgba(214, 194, 160, 1)'
        return
      }
      document.getElementById(id).style.background = 'rgba(95, 157, 159, 0.6)'
    },
    handleDrop (e, index, id) {
      const file = e.dataTransfer.items[0].getAsFile()
      document.getElementById(id).style.background = 'rgba(95, 157, 159, 0.6)'

      file.type.split('/')[0] === 'audio'
        ? this.$emit('audioPreviewUpload', file, index)
        : this.$emit('iconUpdate', file, index)
    },
    onPress (index) {
      if (!this.node.children[index].icon) {
        return
      }
      EventBus.$emit('playAudio', this.node.children[index].previewAudio[this.selectedLanguage])
    }
  }
}
</script>

<style scoped>
.iconarea {
  max-width: 520px;
  padding-top: 4vh;
}
.maps{
  height: 50vh;
  width: 100%;
}
.icontext{
  margin-right: 4px;
  position: absolute;
  right: 0;
  font-size: 2vw;
  opacity: 0.5;
}
.box {
    width: 18vw;
    height: 18vw;
    max-width: 100px;
    max-height: 100px;
    position: relative;
}
.box:hover {
  background: rgba(95, 157, 159,0.9);
}
#audio {
  color: yellow;
}
.icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 12vw;
  max-height: 100px;
}
.loader {
    border: 5px dotted 2, 39, 107);
    border-radius: 30px;
    height: 50px;
    left: 50%;
    position: absolute;
    top: 25%;
    width: 50px;
    animation: pulse 1.5s ease-out;
    animation-iteration-count: infinite;
}

@keyframes pulse {
    0% {
      transform: scale(.1);
      opacity: 0.0;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: scale(1.2);
      opacity: 0;
    }
}
</style>
