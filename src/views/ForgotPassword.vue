<template>
  <div class="container" style="padding: 30px;">
    <form>
      <input v-model="userName" type="username" class="form-control"  placeholder="Käyttäjätunnus">
      <input v-model="password" type="password" class="form-control"  placeholder="Salasana">
      <input v-model="passwordConf" type="password" class="form-control"  placeholder="Varmista salasana">
      <input v-model="code" type="password" class="form-control"  placeholder="Nollauskoodi">
      <div >
        <button  v-on:click="reset" class="btn btn-secondary" :disabled="!userName" >Hanki nollauskoodi</button>
        <button  v-on:click="submit" class="btn btn-primary" :disabled="!userName || !code || !(password === passwordConf) ">Vaihda salasana </button>
    </div>
    </form>
    <div v-if="error"  class="alert alert-danger">
      {{error}}
    </div>
  </div>
</template>

<script>
import { Auth, logger } from 'aws-amplify'

export default {
  data () {
    return {
      code: '',
      userName: '',
      password: '',
      passwordConf: '',
      error: ''
    }
  },
  methods: {
    reset () {
      Auth.forgotPassword(this.userName)
        .then(() => logger.debug('code resent'))
        .catch(err => this.setError(err))
    },
    submit () {
      Auth.forgotPasswordSubmit(this.userName, this.code, this.password)
        .then(() => this.$router.push('/admin'))
        .catch(err => this.setError(err))
    },
    setError (err) {
      console.log(err)
      if (err.code === 'InvalidParameterException') {
        this.error = 'Salasanan pitää olla vähintään 6 merkkiä pitkä'
      } else if (err.code === 'UserNotFoundException') {
        this.error = 'Käyttäjää ei löydy'
      }
    }
  }
}
</script>

<style>
input {
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>
