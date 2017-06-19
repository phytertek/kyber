// our packages
import { hash, logger, asyncReq } from '../util'
import { validNewUser } from '../validation'
import { User } from '../db'

export default (app) => {
  app.post(
    '/api/register',
    asyncReq(async (req, res) => {
      const { valid, errors } = await validNewUser(req.body)

      if (!valid) {
        const errorMessages = errors.map((err) => {
          logger.error(err.log)
          return err.message
        })
        res.status(400).send({ errors: errorMessages })
        return
      }

      const hashedPassword = hash(req.body.password)

      const user = new User({
        username: req.body.username,
        password: hashedPassword
      })
      await user.save()

      res.sendStatus(201)
    })
  )
}
