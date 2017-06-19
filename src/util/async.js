import { logger } from './'

export const asyncReq = handler => (req, res) =>
  handler(req, res).catch(e => logger.error('Error during async request =>', e))
