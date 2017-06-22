// our packages
import get from './get'
import create from './create'
import update from './update'
import remove from './remove'
import answer from './answer'

export default (app) => {
  get(app)
  create(app)
  update(app)
  remove(app)
  answer(app)
}
