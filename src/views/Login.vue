<template>
  <div class="container" style="padding: 30px;">
      <form @submit.prevent="submit">
        <input v-model="username" type="username" class="form-control" id="exampleFormControlInput1" placeholder="Käyttäjätunnus">
        <input v-model="password" type="password" class="form-control" id="exampleFormControlInputPass" placeholder="Salasana">
        <input type="submit" :disabled="!username || !password" class="btn btn-primary" value="Kirjaudu" />
      </form>
      <router-link to="forgot">Nollaa salasana</router-link>
      <div v-if="error" class="alert alert-danger">
        Sisäänkirjautuminen epäonnistui
      </div>
  </div>
</template>

<script>
import { Auth, Logger } from 'aws-amplify'
import authService from '../auth'

const logger = new Logger('LoginPage')

export default {
  data () {
    return {
      username: '',
      password: '',
      error: ''
    }
  },
  methods: {
    submit: function (evt) {
      evt.preventDefault()
      Auth.signIn(this.username, this.password)
        .then(user => {
          logger.debug('sign in success', user)
          authService.setUser(user)
        }).then(() => {
          this.$router.push('/admin')
        })
        .catch(err => {
          logger.debug('Error', err)
          this.error = err
        })
    }
  }
}
</script>

<style scoped>
input {
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>
