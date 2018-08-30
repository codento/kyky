<template>
  <div>
    <audio id="audio">
      <source :src="soundUrl">
      Your browser does not support the audio element.
    </audio>
      <div v-if="adminview" style="max-width: 100px;">
        <p style="position: absolute; bottom: 150px; left: 2%;">
          Sivun ääni: <br>
          <br>
          {{ this.sound }}
        </p>
      </div>
      <img
        class="headericon"
        id="voicebutton"
        style="max-height: 150px;"
        :src="muted ? '../../static/voiceoff.png' : '../../static/voiceon.png'"
        @click="handleVoiceButtonClick" />
  </div>
</template>

<script>
import EventBus from '../utils/eventBus'

export default {
  props: [
    'sound',
    'deleteMode',
    'adminview',
    'muted',
    'flipMuted'
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
    handleVoiceButtonClick: function () {
      if (this.muted) {
        this.flipMuted()
        this.playAudio()
      } else {
        this.flipMuted()
        EventBus.$emit('stopAudio');
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

