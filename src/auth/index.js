import { Auth } from 'aws-amplify'

export default {
  user: {
    authenticated: false,
    user: null,
    userId: null
  },

  // Send a request to the login URL and save the returned JWT
  setUser (user) {
    this.user.authenticated = true
    this.user.user = user
  },
  setUserId (userId) {
    this.user.userId = userId
  },

  // To log out, we just need to remove the token
  logout () {
    Auth.signOut().then(() => {
      this.user.authenticated = false
    }).catch(err => this.setError(err))
  },
  isAuthenticated () {
    if (Auth.currentSession().idToken) {
      this.user.authenticated = true
    } else {
      this.user.authenticated = false
    }
    return this.user.authenticated
  }

  // The object to be passed as a header for authenticated requests
}
