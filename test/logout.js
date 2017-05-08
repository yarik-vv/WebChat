const chai = require('chai');
const app = require('app');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;
chai.use(chaiHttp);
  
describe('Logout test:', () => { 
  it('user sign out', (done) => { 
    chai.request(app)
      .post('/logout')
      .send()
      .end((err, res) => {
        expect(res).to.redirect;
        expect(res).to.have.status(200);
        done();
      }) 
  });
});