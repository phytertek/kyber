// npm packages
import passport from 'passport'

// our packages
import { r, Question } from '../db'
import { asyncReq } from '../util'
import { db as dbConfig } from '../../config'

export default (app) => {
  // Get last 10 questions
  app.get(
    '/api/question',
    passport.authenticate('jwt', { session: false }),
    asyncReq(async (req, res) => {
      // get last 10 questions
      const questions = await Question.merge(q => ({
        owner: r
          .db(dbConfig.db)
          .table('User')
          .get(q('owner'))
          .without(['password'])
      }))
        .orderBy(r.desc('creationDate'))
        .limit(10)
        .execute()
      // send the results back
      res.send(questions)
    })
  )

  // Get question by id
  app.get(
    '/api/question/:id',
    passport.authenticate('jwt', { session: false }),
    asyncReq(async (req, res) => {
      // get requested question
      const question = await Question.get(req.params.id)
      // send the results back
      res.send(question)
    })
  )
}
