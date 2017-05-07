const assert = require('assert');
const checkAuth = require('middleware/checkAuth');
const checkAdmin = require('middleware/checkAdmin');

const reqT = {
  'session': {
    'user': {
      'username': 'name'
    }
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

  describe('#check administrator permission module(checkAdmin.js):', () => {
    it('if user is an administrator', () => {
      assert.equal(
        undefined, 
        checkAdmin(reqT, 'res', () => {return true})
      );
    });

    it('if user is not an administrator', () => {
      assert.equal(
        true, 
        checkAdmin(reqF, 'res', () => {return true})
      );
    });
  });
});