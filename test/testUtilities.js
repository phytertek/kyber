import {User} from '../src/db'

export const clearTestDB = async () => {
  await User.filter({
    username: 'Test Username'
  })
  .delete()
  .run()
}
