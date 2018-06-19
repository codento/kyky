<template>
  <div class="container" style="margin: 8px;">
    <button class="btn btn-success" @click="$emit('getJSON', 'save')"> Tallenna </button>
    <button class="btn btn-danger" @click="$emit('toggleDeleteMode')"> {{ deleteMode ? 'Poista klikkaamalla...' : 'Aloita poistaminen' }}</button>
    <form @change="handleAudioUpload">
      <input
        id="audiofile"
        name="audiofile"
        type="file"
        accept="audio/*"
        capture>
      <label
        id="audiolabel"
        for="audiofile"
        @dragenter.prevent="handleDragEnter"
        @dragleave.prevent="handleDragLeave"
        @drop.prevent="handleDrop"
        @dragover.prevent="{}"
        style="width: 100%">
        Aseta sivun ääni
      </label>
    </form>
    <form @submit.prevent="() => addMaps()" id="mapsLocation">
      <label>Karttamerkki</label>
      <input class="form-control" id="locationInput" v-model="node.location" type="text" placeholder="Lisää Karttamerkki"> <br>
   </form>
  <div class="form-group">
    <label for="exampleInputEmail1">Uusi Linkki</label>
    <input id="newUrl" v-model="newUrl" type="text" placeholder="Lisää linkki."> <br>
  </div>
   <br />
   <button class="btn btn-success" style="min-height: 50px" @click="$emit('getJSON', 'publish')"> Julkaise </button>
   <button class="btn btn-primary" @click="logout()"> Kirjaudu ulos </button>
  </div>
</template>

<script>
import { saveAudio } from '../services/audioService'
import { saveIcon } from '../services/iconService'
import Auth from '../auth'
import {verifyProtocol, getPrefix} from '../utils'

export default {
  name: 'App',
  props: [
    'node',
    'selectedLanguage',
    'deleteMode',
    'unloadListener'
  ],
  methods: {
    logout () {
      if (window.confirm('Do you want to logout?')) {
        window.removeEventListener('beforeunload', this.unloadListener)
        Auth.logout()
        this.$router.go('/')
      }
    },
    addChild: function (iconUrl) {
      let newLink = this.newUrl
      if (this.newUrl && !verifyProtocol(this.newUrl)) {
        newLink = getPrefix(this.newUrl) + this.newUrl
      }
      this.$emit('addChild', {
        // TODO IMPORTANT: REPLACE
        id: Math.ceil(Math.random() * 1000000), // TO BE REPLACED MBY USE THIS LATER:  this.newChildName,
        // IMPORTANT
        icon: iconUrl,
        links: [],
        audio: ['', '', ''],
        children: [],
        previewAudio: ['', '', ''],
        url: newLink
      })
      this.newUrl = ''
      document.getElementById('newUrl').blur()
    },
    addAudio: function (audioUrl) {
      this.node.audio[this.selectedLanguage] = audioUrl
      this.$emit('addContent', {
        links: this.node.links,
        audio: this.node.audio
      })
    },
    // TODO: COMBINE THE NEXT TWO METHODS
    handleAudioUpload: function (file) {
      const audioInput = !(file instanceof Event) ? file : document.getElementById('audiofile').files[0]
      if (file && file.size > 100000) {
        alert('Suurin sallittu tiedosto koko on 100kb')
        return
      }
      saveAudio(audioInput).then((res) => {
        this.addAudio(res.key)
      })
    },
    handleIconUpload: function (file) {
      const iconinput = !(file instanceof Event) ? file : document.getElementById('iconfile').files[0]
      saveIcon(iconinput).then((res) => {
        this.addChild(res.key)
      })
    },
    handleDragEnter (e) {
      document.getElementById(e.target.id).style.backgroundColor = 'orange'
    },
    handleDragLeave (e) {
      document.getElementById(e.target.id).style.backgroundColor = 'gray'
    },
    handleDrop (e) {
      const file = e.dataTransfer.items[0].getAsFile()
      document.getElementById(e.target.id).style.backgroundColor = 'gray'
      e.target.id === 'audiolabel' ? this.handleAudioUpload(file) : this.handleIconUpload(file)
    },
    addMaps () {
      document.getElementById('locationInput').blur()
    }
  },
  data () {
    return {
      newUrl: '',
      location: ''
    }
  }
}
</script>

<style scoped>
input{
  width: 100%;
}
.btn {
  width: 100%;
  outline: none;
  height: 3vh;
  min-height: 30px;
  margin: 0px 0px 4px 0px;
}
#audiofile {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
#audiofile + label {
  color: white;
  background-color: gray;
  display: inline-block;
  cursor: pointer;
  padding: 20px;
}

#audiofile:focus + label,
#audiofile + label:hover {
  background-color: orange;
}
#iconfile {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
#iconfile + label {
  color: white;
  background-color: gray;
  display: inline-block;
  cursor: pointer;
  padding: 20px;
}

#iconfile:focus + label,
#iconfile + label:hover {
  background-color: orange;
}
.row {
  padding-top: 4px;
  margin-left: 0px;
  margin-right: 0px;
  padding-right: 0px;
  width: 80%;
  display: inline-block;
}

.container {
   min-width: 180px;
}
</style>
