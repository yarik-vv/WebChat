import jQuery from 'jquery';

  const form = $('form[name="webchat"]');
  const input = $('form[name="webchat"] input');
  const ul = $('form[name="webchat"] ul');
  const scrollHeight = 999999;

function status(status, color){
  $('<li>')
    .css('background-color', color)
    .addClass('log')
    .text(status)
    .appendTo(ul);
}

module.exports = status;
