/* eslint-disable */

// our packages
import {request} from './'
import {app as appConfig} from '../config'

describe('User', () => {
  const host = appConfig.hostPort
  const tuser = {
    username: "Test Username",
    password: 'abc123'
  }
  let user
  let token
  

  describe('GET', () => {
     describe('/api/user/:id',  () => {
       it('should return a user', (done) => {
        request(host).post('/api/login').send(tuser).end((err, res) => {
          user = res.body.user
          token = res.body.token
          request(host).get(`/api/user/${user.id}`).set('x-access-token', token).end((error, result) => {
            result.body.should.not.be.null
            result.body.username.should.equal(tuser.username)
            done()
          })
        })
      })
    })
  })
  describe('DELETE', () => {
    describe('/api/user/:id', () => {
      it('should return status 202', (done) => {
        request(host).del(`/api/user/${user.id}`).set('x-access-token', token).end((err, res) => {
          res.status.should.equal(202)
          done()
        })
      });
    });
  });
})

// afterEach(function (done) {
//   setTimeout(done, 30);
// });
