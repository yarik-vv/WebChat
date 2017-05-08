const chai = require('chai');
const app = require('app');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;
chai.use(chaiHttp);

describe('User access tests for the application:', () => {
  describe('-unregistered user:', () => {
    it('has access to login page', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.be.html;
          expect(res).to.have.status(200);
          done();
        }) 
    }); 

    it('does not have access to the chat page', (done) => {
      chai.request(app)
        .get('/travelchat')
        .end((err, res) => {
          expect(res).to.be.html;
          expect(res).to.have.status(401);
          done();
        }) 
    });

    it('does not have access to the users page', (done) => {
      chai.request(app)
        .get('/users')
        .end((err, res) => {
          expect(res).to.be.html;
          expect(res).to.have.status(401);
          done();
        }) 
    });
  });
  
  describe('-registered user with no administrator rights:', () => {
    it('has access to login page', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.be.html;
          expect(res).to.have.status(200);
          done();
        }) 
    }); 

    it('has access to chat page', (done) => {
      chai.request(app)
        .post('/')
        .send({ username: 'test', password: 'test' })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        })
    });

    it('does not have access to the users page', (done) => {
      chai.request(app)
        .post('/')
        .send({ username: 'test', password: 'test' })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          
          return chai.request(app)
            .get('/users')
            .end((err, res) => {
              expect(res).to.be.html;
              expect(res).to.have.status(401);
              done();
            }) 
        })
    });
  });

});