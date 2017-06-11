// our packages
import app from './app'
import {logger} from './util'
import {thinky} from './db'
import {db as dbConfig, app as appConfig} from '../config'

// wait for db to initialize
logger.info(`Connecting to ${dbConfig.db}...`)
thinky.dbReady().then(() => {
  logger.info(`Database ready, starting ${appConfig.name}...`)
  //start server
  app.listen(appConfig.port, function() {
    logger.info(`${appConfig.name} listening at ${appConfig.host}:${appConfig.port}`)
  })
})

// output all uncaught exceptions
process.on('uncaughtException', err => logger.error('Uncaught exception', err))
process.on('unhandledRejection', err => logger.error('Unhandled rejection', err))
