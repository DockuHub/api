import chai from 'chai';
import chaiHttp from 'chai-http';

import { app } from '../../server';

chai.use(chaiHttp);
chai.should();

describe('User', () => {
  /**
   *
   * Get all users
   *
   */
  describe('GET /users', () => {
    it('Should get all users', done => {
      chai
        .request(app)
        .get('/api/users')
        .set('Content-Type', 'application/json')
        .end((err: Error, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a('array');
          done();
        });
    });
  });

  /**
   *
   * Send bad request for username
   *
   */
  describe('GET /users/:username', () => {
    it('Should get 400 for invalid request', done => {
      chai
        .request(app)
        .get('/api/users/test-invalid-user')
        .set('Content-Type', 'application/json')
        .end((err: Error, res) => {
          res.should.have.status(400);
          res.body.data.should.be.a('object');
          done();
        });
    });
  });
});
