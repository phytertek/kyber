// our packages
import {hash, matchHash} from '../src/util'

describe('Utilities', () => {
  const str = 'Some Test Text'
  describe('Hash function', () => {
    it('should create a hash 65 characters long', () => {
      const strHash = hash(str)
      strHash.length.should.equal(65)
    })
    it('should not create the same hash for the same text', () => {
      const sth1 = hash(str)
      const sth2 = hash(str)
      sth1.should.not.equal(sth2)
    })
  })
  describe('Match Hash function', () => {
    it('should verify a match', () => {
      const sth1 = hash(str)
      const match = matchHash(str, sth1)
      match.should.be.true
    })
    it('should verify unique hashes', () => {
      const sth1 = hash(str)
      const m1 = matchHash(str, sth1)
      const sth2 = hash(str)
      const m2 = matchHash(str, sth2)
      m1.should.be.true
      m2.should.be.true
    })
  })
})