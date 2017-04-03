$(document.forms['login']).on('submit', function () {
  var form = $(this);

  $.ajax({
    url: "/",
    data: form.serialize(),
    method: "POST",
    complete: function () {},
    statusCode: {
      200: function () {
        window.location.href = "/webchat";
      },
      403: function (jqXHR) {
        var error = JSON.parse(jqXHR.responseText);
        $('.error', form).html(error.message);
      }
    }
  });
  return false;
});
