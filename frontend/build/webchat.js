(function () {
  const form = $('form[name="webchat"]');
  const input = $('form[name="webchat"] input');
  const ul = $('form[name="webchat"] ul');
  const scrollHeight = 999999;

  const socket = io('', {
    'reconnectionAttempts': 30,
    'reconnectionDelay': 500
  });

  socket
    .on('message', function (username, message) {
      printMessage(message, username);
      $('<span>')
        .text(username + ', ' + new Date())
        .appendTo(li)
        .addClass('description');
    })
    .on('leave', function (username) {
      printStatus(username + " покинул чат", "#d6f1e9");
    })
    .on('join', function (username) {
      printStatus(username + " зашел в чат", "#d6f1e9");
    })
    .on('connect', function () {
      printStatus("Соединение установлено", "#26fa88");
      form.on('submit', sendMessage);
      input.prop('disabled', false);
    })
    .on('disconnect', function () {
      printStatus("Переподключение...", "#f1d6ee");
      form.off('submit', sendMessage);
      input.prop('disabled', true);
    })
    .on('logout', function () {
      location.href = "/";
    })
    .on('error', function (reason) {
      if (reason == "handshake unauthorized") {
        printStatus("Вы покинули чат");
      }
    })
    .on('reconnect_failed', function () {
      printStatus("Соединение потеряно", "#f1d6ee");
    });

  const sendMessage = function () {

    const text = input.val();
    socket.emit('message', text, function (data) {
      $('<li>')
        .text(text)
        .appendTo(ul)
        .addClass('my');

      var hours = new Date().getHours();
      if (new Date().getMinutes() < 10) {
        var minutes = '0' + new Date().getMinutes();
      } else {
        var minutes = new Date().getMinutes();
      }

      $('<span>')
        .text('you, ' + hours + ':' + minutes)
        .appendTo(ul)
        .addClass('mdescription');

      ul.scrollTop(scrollHeight);
    });

    input.val('');
    return false;
  }

  const printMessage = function (text, username) {
    $('<li>')
      .text(text)
      .appendTo(ul)
      .addClass('nmy');

    var hours = new Date().getHours();
    if (new Date().getMinutes() < 10) {
      var minutes = '0' + new Date().getMinutes();
    } else {
      var minutes = new Date().getMinutes();
    }

    $('<span>')
      .text(username + ', ' + hours + ':' + minutes)
      .appendTo(ul)
      .addClass('nmdescription');

    ul.scrollTop(scrollHeight);
  }

  const printStatus = function (status, color, icon, iconColor) {
    $('<li>')
      .css('background-color', color)
      .text(status)
      .appendTo(ul)
      .addClass('log');
    ul.scrollTop(scrollHeight);
  }


//  $(window).resize(function() {
//    alert( $(window).height() );
//    let vh = document.documentElement.clientHeight;
//    form.css('height', vh);
//  })
})();
