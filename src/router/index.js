import Vue from 'vue'
import Router from 'vue-router'
import { Auth } from 'aws-amplify'
import LandingPage from '../views/LandingPage'
import AdminPage from '../views/AdminPage'
import InfoPage from '../views/InfoPage'
import Login from '../views/Login'
import ForgotPassword from '../views/ForgotPassword'
import AuthService from '../auth'

Vue.use(Router)

const AuthFilter = (to, from, next) => {
  Auth.currentAuthenticatedUser()
    .then(user => {
      AuthService.setUser(user)
      Auth.currentCredentials()
        .then(credentials => {
          AuthService.setUserId(credentials.identityId)
        })
      next()
    })
    .catch(err => {
      console.log('...no user', err)
      AuthService.setUser(null)
      to.name.startsWith('auth') ? next() : next('/login')
    })
}
export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: LandingPage
    },
    {
      path: '/admin',
      name: 'Admin',
      component: AdminPage,
      beforeEnter: AuthFilter
    },
    {
      path: '/info/:language',
      name: 'info',
      component: InfoPage,
      props: true,
      beforeEnter: (to, from, next) => {
        from.name === 'Home' ? next() : next('/')
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/forgot',
      name: 'forgot',
      component: ForgotPassword
    },
    {
      path: '*',
      redirect: { name: 'root' }
    }
  ]
})
