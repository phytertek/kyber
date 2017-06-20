import getUser from './get'
import deleteUser from './delete'

// export User API routes
export default (app) => {
  getUser(app)
  deleteUser(app)
}
