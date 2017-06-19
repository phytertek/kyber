// our packages
import {request} from './'
import {app as appConfig} from '../config.js'

describe('Authentication', () => {
  const host = appConfig.hostPort
  const register = '/api/register'
  const tuser = { 
    username: 'Test Username', 
    password: 'abc123', 
    password2: 'abc123'
  }
  describe('POST', () => {
    describe('/api/register', () => {
      it('should not allow blank username', (done) => {
        const user = {...tuser, username: ''}
        request(host).post(register).send(user).end((err) => {
          err.status.should.equal(400)
          err.should.not.be.null
          done()
        })
      })
      it('should not allow blank password', (done) => {
        const user = {...tuser, password: '', password2: ''}
        request(host).post(register).send(user).end((err, res) => {
          err.should.not.be.null
          err.status.should.equal(400)
          done()
        })
      })
      it('should not allow password validation missmatch', (done) => {
        const user = {...tuser, password2: '123abc'}
        request(host).post(register).send(user).end((err, res) => {
          err.should.not.be.null
          err.status.should.equal(400)
          done()
        })
      })
      it('should return status of 201 when new user created successfully', (done) => {
        const user = {...tuser}
        request(host).post(register).send(user).end((err, res) => {
          res.status.should.exist
          res.status.should.equal(201)
          done()
        })
      })
    })
  })
})