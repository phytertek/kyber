// our packages
import {thinky} from '../'

// export User model
export const User = thinky.createModel('User', {
  username: thinky.type.string().required(),
  password: thinky.type.string().required(),
  registrationDate: thinky.type.date().default(thinky.r.now())
})
