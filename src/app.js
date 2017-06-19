// npm packages
import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'

// our packages
import {logger} from './util'
import authRoutes from './auth'
import userRoutes from './user'

// initialize app
const app = express()

// Body Parsing
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// set up logging
app.use(morgan('combined', {stream: logger.stream}))

// auth routes
authRoutes(app)

// user routes
userRoutes(app)

// catch all unhandled errors
app.use((req, res) => {
  const message = { error: `Unable to resolve ${req.originalUrl}`}
  logger.error(message)
  res.status(404).send(message)
})

// export app
export default app
