// npm packages
import passport from 'passport'

// our packages
import { User } from '../db'
import {asyncReq} from '../util'

export default (app) => {
  app.delete('/api/user/:id', passport.authenticate('jwt', {session: false}), asyncReq(async (req, res) => {
    let user
    if (req.params.id === 'me') {
      user = req.user.id
    } else {
      user = req.params.id
    }

    try {
      const deletedUser = await User.get(user).run().then(u => u.delete())
      res.status(202).send(deletedUser)
    } catch (e) {
      res.status(400).send({ error: e})
    }
  }))
}
