'use strict';

import jQuery from 'jquery';

function login() {
  var form = $(document.forms['login']);
  $.ajax({
    url: "/",
    data: form.serialize(),
    method: "POST",
    complete: function () {},
    statusCode: {
      200: function () {
        alert('suka');
        location.href = "/webchat";
      },
      403: function (jqXHR) {
        var error = JSON.parse(jqXHR.responseText);
        $('.error', form).html(error.message);
      }
    }
  });
  return false;
}

module.exports = login;