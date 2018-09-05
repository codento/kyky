<template>
  <div class="path">
    <ul>
      <li >
        <button class="box" @click="hamdlePathButtonClick" :style="getButtonColour(2)">
          <div :style="getStyleByPhone()">
            <img class="icon" src="../../static/helsinkiIcon.png" :height="deviceDimension.height / 15" :width="deviceDimension.height / 15"/>
          </div>
        </button>
      </li>
      <li v-for="(waypoint, index) in path" :key="index">
        <button class="box" @click="hamdlePathButtonClick(index)" :style="getButtonColour(index+3)">
          <div :style="getStyleByPhone()">
            <img class="icon" :src="iconUrl(waypoint)" :height="deviceDimension.height / 15" :width="deviceDimension.height / 15"/>
          </div>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: [
    'path',
    'colors',
    'moveToParent'
  ],
  methods: {
    iconUrl: function (route) {
      return 'https://' + process.env.RESOURCEBUCKET + '.s3.eu-west-1.amazonaws.com/public/' + route
    },
    getButtonColour: function (index) {
      return 'background-color: ' + this.colors[index]
    },
    hamdlePathButtonClick: function (index) {
      let steps = this.path.length - (Number(index)+1  || 0)
      for (let i = 0; i < steps; i++) {
        this.moveToParent()
      }
    },
    getStyleByPhone: function () {
      return window.navigator.userAgent.match(/iPhone/i) ? 
        "position: absolute; height: 9vh; width: 9vh; top: 0%; margin-left: -8px;" :
        "position: absolute; height: 9vh; width: 9vh; top: 0%;"
    }
  },
  computed: {
    deviceDimension () {
      return {
        height: document.documentElement.clientHeight,
        width: document.documentElement.clientWidth
      }
    }
  }
}
</script>

<style scoped>
.icon {
  position: absolute;
  top: 50%;
  left: calc(50% - 8px);
  transform: translate(-50%, -50%);
  height: 7vh;
}
.box {
    margin-top: 0px;
    margin-bottom: 0px;
    width: 9vh;
    height: 9vh;
    outline: none;
}
ul {
  padding: 0px;
}
li {
  list-style-type: none;
  float: left;
}
</style>
