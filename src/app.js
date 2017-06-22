// npm packages
import express from 'express'
import session from 'express-session'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import cors from 'cors'

// our packages
import {auth as authConfig} from '../config'
import {logger} from './util'
import authRoutes from './auth'
import userRoutes from './user'
import questionRoutes from './question'

// initialize app
const app = express()

// set up logging
app.use(morgan('combined', {stream: logger.stream}))

// set up cors
app.use(cors())

// Body Parsing
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// add cookie parsing
app.use(cookieParser())

// add session support
app.use(session({
  secret: authConfig.sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: {secure: true}
}))

// add passport.js
app.use(passport.initialize())
app.use(passport.session())

// auth routes
authRoutes(app)

// user routes
userRoutes(app)

// question routes
questionRoutes(app)

// catch all unhandled errors
app.use((req, res) => {
  const message = { error: `Unable to resolve ${req.originalUrl}`}
  logger.error(message)
  res.status(404).send(message)
})

// export app
export default app
