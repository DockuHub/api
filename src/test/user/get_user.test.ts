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
   * Get single user with id=1
   *
   */
  describe('GET /users/:id', () => {
    it('Should get a single user', done => {
      chai
        .request(app)
        .get('/api/users/1')
        .set('Content-Type', 'application/json')
        .end((err: Error, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a('object');
          done();
        });
    });
  });
});
