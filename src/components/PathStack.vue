<template>
  <div class="path">
    <ul>
      <li >
        <button class="box" @click="hamdlePathButtonClick" :style="getButtonColour(2)">
          <img id="icon" src="../../static/helsinkiIcon.png" :height="deviceDimension.height / 15" :width="deviceDimension.height / 15"/>
        </button>
      </li>
      <li v-for="(waypoint, index) in path" :key="index">
        <button class="box" @click="hamdlePathButtonClick(index)" :style="getButtonColour(index+3)">
          <img id="icon" :src="iconUrl(waypoint)" :height="deviceDimension.height / 15" :width="deviceDimension.height / 15"/>
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
