// npm packages
import chai from 'chai'
import chaiHttp from 'chai-http'

chai.use(chaiHttp)

export const expect = chai.expect
export const request = chai.request
export const should = chai.should()
export const assert = chai.assert
