import jQuery from 'jquery';
import websockets from './websockets';

const socket = websockets.socket;
  const form = $('form[name="webchat"]');
  const input = $('form[name="webchat"] input');
  const ul = $('form[name="webchat"] ul');
  const scrollHeight = 999999;

  const send = function() {
    
    const text = input.val();
    socket.emit('message', text, function(data) {
      $('<li>')
        .text(text)
        .appendTo(ul)
        .addClass('my');
      
      var hours = new Date().getHours();
      if(new Date().getMinutes()<10){
        var minutes='0'+new Date().getMinutes();
      }
      else{
        var minutes=new Date().getMinutes();
      }
      
      $('<span>')
        .text('you, '+hours+':'+minutes)
        .appendTo(ul)
        .addClass('mdescription');
      
      ul.scrollTop(scrollHeight);
    });
    
    input.val('');
    return false;
  }

  const print = function(text, username) {
    $('<li>')
      .text(text)
      .appendTo(ul)
      .addClass('nmy');
    
    var hours = new Date().getHours();
    if(new Date().getMinutes()<10){
      var minutes='0'+new Date().getMinutes();
    }
    else{
      var minutes=new Date().getMinutes();
    }
    
    $('<span>')
      .text(username+', '+hours+':'+minutes)
      .appendTo(ul)
      .addClass('nmdescription');
    
    ul.scrollTop(scrollHeight);
  }

module.exports = send;
module.exports = print;