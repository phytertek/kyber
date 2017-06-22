// npm packages
import passport from 'passport'

// our packages
import { usernameTaken } from '../validation'
import { User } from '../db'
import { matchHash, hash, asyncReq } from '../util'

export default (app) => {
  app.post(
    '/api/user/:id',
    passport.authenticate('jwt', { session: false }),
    asyncReq(async (req, res) => {
      const { username, password, password2 } = req.body

      const own = req.params.id === 'me' || req.params.id === req.user.id
      // check if user is changing his own profile
      if (!own) {
        res
          .status(403)
          .send({ error: 'Not enough rights to change other user profile!' })
        return
      }

      const user = await User.get(
        req.params.id === 'me' ? req.user.id : req.params.id
      )

      // check if user exists
      if (!user) {
        res.status(400).send({ error: 'User does not exist' })
        return
      }

      // check if data is actually changed
      const usernameChanged = username && user.username !== username
      const passwordChanged = password && !matchHash(password, user.password)
      // if not - just send OK
      if (!usernameChanged && !passwordChanged) {
        delete user.password
        res.send(user)
        return
      }

      // check passwords for match
      if (passwordChanged && password !== password2) {
        res.status(400).send({ error: 'Passwords do not match!' })
        return
      }

      // check if new username is taken
      if (usernameChanged && (await usernameTaken(username))) {
        res.status(400).send({ error: 'username already taken!' })
        return
      }

      // update data
      if (username) {
        user.username = username
      }
      if (password) {
        user.password = hash(password)
      }
      // try to save
      await user.save()

      // send succcess
      delete user.password
      res.send(user)
    })
  )
}
