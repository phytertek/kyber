/* eslint-disable */

// our packages
import {request} from './'
import {app} from '../config'

describe('User', () => {
  const host = app.hostPort
  const tuser = {
    username: "Test Username"
  }
  describe('DELETE', () => {
    describe('/api/user/delete', () => {
      it('should return status 200', (done) => {
        // const user = {...tuser}
        // request(host).post('/api/user/delete').send(user).end((err, res)=> {
        //   res.status.should.equal(200)
        //   done()
        // })
        request(host).post('/api/user/delete').send({
          username: 'Test Username'
        })
        .end((err, res) => {
          // console.log(err.status, res.body)
          res.status.should.equal(200)
          done()
        })
      });
    });
  });
})
