//create websocket server
const ioserver = require('socket.io').listen(3000);
ioserver.sockets.on('connection', (socket) => {});

//import websocket client
const io = require('../public/vendor/socket.io-client/');
const url = 'http://127.0.0.1:3000';

//test connection
describe('Test socket.io and socket.io-client:', function(){
  it('client connected to server', (done) => { 
    io.connect(url)
      .on('connect', () => {  
        done();
      })
  });
});