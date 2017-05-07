const assert = require('assert');
const checkAuth = require('middleware/checkAuth');

const reqT = {
  "session": {
    "user": 'test'
  }
}

const reqF = {
  "session": {}
}

describe('Middleware:', () => {
  describe('#check authorization module(checkAuth.js):', () => {
    it('if user is already authorized', () => {
      assert.equal(
        undefined, 
        checkAuth(reqT, 'res', () => {return true})
      )
    });

    it('if user is not yet authorized', () => {
      assert.equal(
        true, 
        checkAuth(reqF, 'res', () => {return true})
      );
    });
  });
});