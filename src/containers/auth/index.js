import Login from './Login'
import Forgot from './Forgot'
import Register from './Register'

const authRoutes = [
  {
    path: '/login',
    component: Login,
    name: 'Login'
  },
  {
    path: '/forgot-password',
    component: Forgot,
    name: 'Forgot Password'
  },
  {
    path: '/register',
    component: Register,
    name: 'Register'
  }
]

export default authRoutes
