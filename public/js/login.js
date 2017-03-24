$(document.forms['login']).on('submit', function () {
  var form = $(this);
  $('.error', form).html('');

  $(":submit", form);
  //alert('anuka');
  $.ajax({
    url: "/",
    data: form.serialize(),
    method: "POST",
    complete: function () {
      $(":submit", form);
      //alert('complete');
    },
    statusCode: {
      200: function () {
        //alert('200');
        form.html("Вы вошли в сайт");
        window.location.href = "/webchat";
      },
      403: function (jqXHR) {
        //alert('403');
        var error = JSON.parse(jqXHR.responseText);
        $('.error', form).html(error.message);
      }
    }
  });
  //alert('return');
  return false;
});