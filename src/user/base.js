/**
 * Base CRUD API
 */

// our packages
import { User } from '../db'
import {asyncReq} from '../util'

export default (app) => {
  app.post('/api/user/delete', asyncReq(async (req, res) => {
    const validFilter = req.body.id
      ? { id: req.body.id }
      : null || req.body.username
          ? { username: req.body.username }
          : null || false
    if (!validFilter) {
      res.status(400).send({ error: 'A username or id must be provided.' })
      return
    }
    const user = validFilter.id
      ? validFilter
      : validFilter.username
          ? await User.filter({ username: req.body.username })
              .run()
              .then(users => users[0])
          : null
    if (user) {
      await user.delete()
      res.status(200).send(user)
    } else {
      res.status(400).send({ error: 'Unable to find user to delete', user })
    }
  }))
}
