<template>
  <div>
    <audio id="audio">
      <source :src="soundUrl">
      Your browser does not support the audio element.
    </audio>
      <div v-if="adminview" style="max-width: 100px;">{{ this.sound }}</div>
      <img class="headericon" id="voicebutton" src="../../static/voiceoff.png" @click="playAudio" />
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
      var voiceoff = "../../static/voiceoff.png";
      var voiceon = "../../static/voiceon.png";
      var imgElement = document.getElementById('voicebutton');
      if (this.deleteMode) {
        this.$emit('deleteSound')
      } else {
        imgElement.src = (imgElement.src === voiceoff)? voiceon : voiceoff;
        EventBus.$emit('playAudio', this.sound);
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
