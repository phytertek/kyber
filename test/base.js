/* eslint-disable */

// test utilities
import {request, should} from './'
import {app as appConfig} from '../config'

describe('Base', () => {
  describe('GET', () => {
    describe('/#Non Existing Url', () => {
      it('should return a status 404', (done) => {
        request(appConfig.hostPort).get('/abadurlthatwontwork').end((err, res) => {
          err.should.not.be.null
          done()
        })
      })
    })
  })
})