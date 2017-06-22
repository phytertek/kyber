// npm packages
import chai from 'chai'
import chaiHttp from 'chai-http'

chai.use(chaiHttp)

export const expect = chai.expect
export const request = chai.request
export const should = chai.should()
export const assert = chai.assert

export const authentication = {
  user: null,
  token: null
}

export const authedUser = (res) => {
  if (res.user) {
    authentication.user = res.user
  }
  if (res.token) {
    authentication.token = res.token
  }
  return authentication
}
