<template>
  <div>
    <audio id="audio">
      <source :src="soundUrl">
      Your browser does not support the audio element.
    </audio>
    <div class="container" @click="playAudio">
      <div v-if="adminview" style="max-width: 100px;">{{ this.sound }}</div>
      <button :style="'font-size: ' + getIconSize() + 'em; color: black; text-align: center;'" class="fas fa-volume-up" @click="playAudio" />
    </div>
  </div>
</template>

<script>
import EventBus from '../utils/eventBus'

export default {
  props: [
    'sound',
    'deleteMode',
    'adminview'
  ],
  methods: {
    playAudio: function () {
      if (this.deleteMode) {
        this.$emit('deleteSound')
      } else {
        EventBus.$emit('playAudio', this.sound)
      }
    },
    getIconSize: function () {
      const windowHeight = document.documentElement.clientHeight
      return windowHeight / 140
    }
  },
  computed: {
    soundUrl: function () {
      return 'https://' + process.env.RESOURCEBUCKET + '.s3.eu-west-1.amazonaws.com/public/' + this.sound
    }
  }
}
</script>
