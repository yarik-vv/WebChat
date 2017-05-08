const chai = require('chai');
const app = require('app');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;
chai.use(chaiHttp);
  
describe('Entering the invalid password test:', () => { 
  it('receive an error when entering the invalid password', (done) => {
    chai.request(app)
      .post('/')
      .send({ username: 'test', password: 'test' })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
          
        return chai.request(app)
          .post('/')
          .send({ username: 'test', password: 'test1' })
          .end((err, res) => {
            expect(res).to.have.status(403);
            done();
          }) 
      })
  });
});