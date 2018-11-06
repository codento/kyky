<template>
  <div>
    <div class="project-details">
      <h1 class="large-text text">Tietoa sovelluksesta</h1>
      <div class="info-box">
        <h2 class="medium-text text">Tuottaja</h2>
        <p class="small-text text">KYKY II, Stadin osaamiskeskus</p>
        <p class="small-text text">Kasvatus ja koulutus</p>
        <p class="small-text text">Helsingin kaupunki</p>
      </div>
      <div class="info-box">
        <h2 class="medium-text text">Ylläpitäjä</h2>
        <p class="small-text text">Olga Kaijalainen</p>
        <p class="small-text text">projektisuunnittelija, KYKY II</p>
        <p class="small-text text">olga.kaijalainen@hel.fi</p>
      </div>
      <div class="info-box">
        <h2 class="medium-text text">Äänet</h2>
        <p class="small-text text">Suomi: Kiira Sirola</p>
        <p class="small-text text">Somali: Nimco Noor</p>
        <p class="small-text text">Arabia: Bilel Sehli ja Anmar Al Ansari</p>
      </div>
      <div class="info-box">
        <h2 class="medium-text text">Graafinen suunnittelu</h2>
        <p class="small-text text">Annika Järvelin</p>
      </div>
      <div class="info-box">
        <h2 class="medium-text text">Avoimen lähdekoodin ohjelmiston tuotti</h2>
        <p class="small-text text">Codento Oy, Tom Thureson</p>
      </div>
    </div>
    <button class="home-btn" @click="goToLandingPage">
      Takaisin
    </button>
  </div>
</template>

<script>
import router from '../router/'

export default {
  name: 'ProjectInfo',
  methods: {
    goToLandingPage () {
      router.push({ name: 'Home', params: { showInfo: false } })
    }
  }
}
</script>

<style scoped>
.project-details {
  padding-top: 15px;
  padding-left: 10vw;
  font-weight: 400;
  line-height: 0.05rem;
  width: 100%;
  position: fixed;
  top: 28vh;
  height: 100%;
  z-index: 4909;
  text-align: left;
  background-color: white;
}
.info-box {
  padding: 0.1rem;
}
.large-text {
  font-size: 1.2rem;
}
.medium-text {
  font-size: 0.9rem;
}
.small-text {
  font-size: 0.7rem;
}
.text {
  color: black;
}
.home-btn {
  position: absolute;
  bottom: 5px;
  left: 5px;
  padding: 3px;
  z-index: 10000;
  font-size: 0.8rem;
  background: none;
  border: 0px;
}
</style>
