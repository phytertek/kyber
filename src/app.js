// npm packages
import express from 'express'
import morgan from 'morgan'

// our packages
import {logger} from './util'

// initialize app
const app = express()

// set up logging
app.use(morgan('combined', {stream: logger.stream}))

// test route
app.get('/', (req, res) => {
  res.status(200).send('Test get success')
})

// catch all unhandled errors
app.use((req, res) => {
  const message = { error: `Unable to resolve ${req.originalUrl}`}
  logger.error(message)
  res.status(404).send(message)
})

// export app
export default app
