// npm packages
import crypto from 'crypto'

// our packages
import { auth as authConfig } from '../../config'

const IV_LENGTH = 16 // For AES, this is always 16
const SALT = authConfig.passwordSalt

export const hash = (str) => {
  const iv = crypto.randomBytes(IV_LENGTH)
  const cipher = crypto.createCipheriv('aes-256-cbc', new Buffer(SALT), iv)
  let encrypted = cipher.update(str)
  encrypted = Buffer.concat([encrypted, cipher.final()])
  return `${iv.toString('hex')}:${encrypted.toString('hex')}`
}

export const matchHash = (str, hashStr) => {
  const hashArray = hashStr.split(':')
  const iv = new Buffer(hashArray.shift(), 'hex')
  const encryptedText = new Buffer(hashArray.join(':'), 'hex')
  const decipher = crypto.createDecipheriv('aes-256-cbc', new Buffer(SALT), iv)
  let decrypted = decipher.update(encryptedText)
  decrypted = Buffer.concat([decrypted, decipher.final()])
  return str === decrypted.toString()
}
