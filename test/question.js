/* eslint-disable */
//npm packages
import moment from 'moment'

// our packages
import {request, authentication} from './'
import {app as appConfig} from '../config'

const host = appConfig.hostPort
const target = '/api/question'
let question

describe('Question', () => {
  describe('POST /api/question', () => {
    it('should create a new question.', (done) => {
      request(host)
      .post(target)
      .set('x-access-token', authentication.token)
      .send({
        text: 'What is it?',
        expirationDate: moment().add(1, 'days').toDate()
      })
      .end((err, res) => {
        res.status.should.equal(200)
        question = res.body || null
        done()
      })
    });
  });
  describe('GET /api/question/:id', () => {
    it('should return the queried question', (done) => {
      request(host)
      .get(`${target}/${question.id}`)
      .set('x-access-token', authentication.token)
      .end((err, res) => {
        res.status.should.equal(200)
        res.body.id.should.equal(question.id)
        res.body.text.should.equal(question.text)
        done()
      })
    });
  });
  describe('POST /api/question/:id', () => {
    it('should return the updated question', (done) => {
      request(host)
      .post(`${target}/${question.id}`)
      .set('x-access-token', authentication.token)
      .send({text: 'changed'})
      .end((err, res) => {
        res.status.should.equal(200)
        res.body.id.should.equal(question.id)
        res.body.text.should.not.equal(question.text)
        done()
      })
    });
  });
  describe('DELETE /api/question/:id', () => {
    it('should remove the question', (done) => {
      request(host)
      .del(`${target}/${question.id}`)
      .set('x-access-token', authentication.token)
      .end((err, res) => {
        res.status.should.equal(204)
        res.body.should.not.be.null
        done()
      })
    });
  });
});


