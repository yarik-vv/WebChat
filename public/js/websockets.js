(function() {
  const form = $('form[name="webchat"]');
  const input = $('form[name="webchat"] input');
  const ul = $('form[name="webchat"] ul');
  const socket = io('', {});

  socket
    .on('message', function(username, message) {
      printMessage(message);
    })
    .on('connect', function() {
      printStatus("соединение установлено", "#d6f1e9");
      form.on('submit', sendMessage);
      input.prop('disabled', false);
    })
    .on('disconnect', function() {
      printStatus("соединение потеряно", "#f1d6ee");
      form.off('submit', sendMessage);
      input.prop('disabled', true);
    })

  const sendMessage = function() {
    const text = input.val();
    socket.emit('message', text, function(data) {
      printMessage(data);
    });
    input.val('');
    return false;
  }

  const printMessage = function(text) {
    $('<li>').text(text).appendTo(ul);
  }

  const printStatus = function(status, color) {
    $('<li>')
    .css('background-color', color)
    .append($('<i>')
    .addClass('log')
    .text(status)).appendTo(ul);
  }

})();