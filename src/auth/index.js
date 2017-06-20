// our packages
import './passport'
import register from './register'
import login from './login'

// export auth routes
export default (app) => {
  login(app)
  register(app)
}
