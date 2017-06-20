// our packages
import { User } from '../db'

export const validNewUser = async (user) => {
  const errors = []

  // check password is in req.body
  if (!user.password) {
    errors.push({
      message: 'Registration requires a password.',
      log: '/api/register: password not present in request.'
    })
  }

  // check password2 is in req.body
  if (!user.password2) {
    errors.push({
      message: 'Registration requires a password confirmation.',
      log: '/api/register: password2 not present in request.'
    })
  }

  // check password validity
  if (user.password !== user.password2) {
    errors.push({
      message: 'Passwords do not match.',
      log: '/api/register: password and password2 from request do not match.'
    })
  }

  // check that username is in req.body
  if (!user.username) {
    errors.push({
      message: 'Registration requires a username',
      log: '/api/register: username not present in request.'
    })
  } else {
    // check if user exists
    const existingUser = await User.filter({ username: user.username })
      .run()
      .then(existingUsers => existingUsers.length !== 0)
    if (existingUser) {
      errors.push({
        message: 'This user already exists',
        log: `Username: ${user.username} already exists`
      })
    }
  }

  return { valid: errors.length === 0, errors }
}
