import getUser from './get'
import updateUser from './update'
import deleteUser from './delete'

// export User API routes
export default (app) => {
  getUser(app)
  updateUser(app)
  deleteUser(app)
}
