const chai = require('chai');
const app = require('app');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;
chai.use(chaiHttp);

describe('Router tests(availability of the application):', () => {
  it('login page', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.be.html;
        done();
      }) 
  }); 

  it('users page', (done) => {
    chai.request(app)
      .get('/travelchat')
      .end((err, res) => {
        expect(res).to.be.html;
        done();
      }) 
  });

  it('chat page', (done) => {
    chai.request(app)
      .get('/users')
      .end((err, res) => {
        expect(res).to.be.html;
        done();
      }) 
  });

  it('attempt to go to a non-existent page', (done) => {
    chai.request(app)
      .get('/kek')
      .end((err, res) => {
        expect(res).to.redirect;
        expect(res).to.be.html;
        done();
      }) 
  });

});