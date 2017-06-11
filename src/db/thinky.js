// npm packages
import initThinky from 'thinky'

// our packages
import {db as dbConfig} from '../../config'

export const thinky = initThinky(dbConfig)
const {r} = thinky

export { r }
