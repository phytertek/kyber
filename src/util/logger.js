// npm packages
import winston from 'winston'

// our packages
import { app as appConfig } from '../../config'

export const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
      colorize: true,
      timestamp: true,
      prettyPrint: true,
      label: appConfig.name
    })
  ]
})

// create stream for morgan
logger.stream = {
  write: message => logger.info(message)
}
