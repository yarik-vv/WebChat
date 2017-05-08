const assert = require('assert');
const AJAXrequest = require('../frontend/request');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

describe('Frontend tests:', () => { 
  it('test request module', (done) => {
    //body parser
    var server = express();
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: false }));
    //router
    server.use('/', router.post('/', (req, res, next) => {
      if(req.body.id=='test') done();
    }));
    //start server
    http.createServer(server).listen(4000);
    //start client request
    AJAXrequest('test');
  });
});