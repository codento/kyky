<template>
  <div class="path">
    <ul>
      <li v-for="(waypoint, index) in path" :key="index">
        <button class="box">
          <img id="icon" :src="iconUrl(waypoint)" :height="deviceDimension.height / 24" :width="deviceDimension.height / 24"/>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: [
    'path'
  ],
  methods: {
    iconUrl: function (route) {
      return 'https://' + process.env.RESOURCEBUCKET + '.s3.eu-west-1.amazonaws.com/public/' + route
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
    width: 5vh;
    height: 5vh;
    outline: none;
}
ul {
  padding: 0px;
}
li {
  list-style-type: none;
}
</style>
